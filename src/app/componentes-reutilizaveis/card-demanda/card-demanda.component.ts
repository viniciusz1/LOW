import { UsuarioService } from 'src/app/services/usuario.service';
import { NivelAcesso } from './../../models/nivel-acesso.enum';
import { RotasModule } from './../../rotas.module';
import { StatusDemanda } from './../../models/statusDemanda.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Demanda } from 'src/app/models/demanda.model';
import { Route, Router } from '@angular/router';
import { RascunhoService } from 'src/app/services/rascunho.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-card-demanda',
  templateUrl: './card-demanda.component.html',
  styleUrls: ['./card-demanda.component.scss'],
  providers: [NgbDropdownConfig],
})
export class CardDemandaComponent implements OnInit {
  @Output() abrirModalMotivoReprovacao = new EventEmitter<Demanda>();
  @Output() abrirModalAvaliarDemanda = new EventEmitter();
  @Output() abrirModalParecerComissao = new EventEmitter<Demanda>();
  @Output() abrirModalReprovar = new EventEmitter<Demanda>()
  @Output() verDocumentoProposta = new EventEmitter<Demanda>();
  @Output() clicouEmExcluir = new EventEmitter();
  @Output() irParaChat = new EventEmitter();
  @Output() abrirModalCriarReuniao = new EventEmitter<Demanda>();
  @Output() modalHistorico = new EventEmitter();
  @Output() verDocumentoEmAta = new EventEmitter();
  @Output() avancarStatusDemanda = new EventEmitter<{
    mensagem: string;
    codigoDemanda: string | undefined;
    statusDemanda: StatusDemanda | undefined;
  }>();

  @Input() mudarTamanho: string = '390px';
  @Input() isPauta: boolean = false;
  @Input() dadosDemanda: Demanda = {};
  @Input() rascunho: boolean = false;
  @Input() exibirBotaoParecerComissao: boolean = false;
  @Input() exibirBotaoParecerDg: boolean = false;
  @Input() tipoDeAta: string = '';
  @Input() mostrarBotao = true

  textoExibidoEmBotaoDependendoRota:
    | { rota: string; texto: string }
    | undefined = undefined;
  nivelAcesso: NivelAcesso = NivelAcesso.Analista;
  primaryColorClass?: string = '';
  secondaryColorClass: string = '';

  constructor(private route: Router,
    private confirmationService: ConfirmationService,
    private rascunhoService: RascunhoService,
    private usuarioService: UsuarioService) {}
  statusPermitido() {
    if (
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_APROVACAO ||
      this.dadosDemanda.statusDemanda == StatusDemanda.ASSESSMENT ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BUSINESS_CASE
    ) {
      return true;
    }
    return false;
  }

  retornaProximoStatusDemanda(statusDemanda: StatusDemanda | undefined) {
    if (statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO) {
      return StatusDemanda.BACKLOG_APROVACAO;
    } else if (statusDemanda == StatusDemanda.BACKLOG_APROVACAO) {
      return StatusDemanda.BACKLOG_PROPOSTA;
    } else if (statusDemanda == StatusDemanda.BACKLOG_PROPOSTA) {
      return StatusDemanda.ASSESSMENT;
    } else if (statusDemanda == StatusDemanda.ASSESSMENT) {
      return StatusDemanda.TO_DO;
    } else if (statusDemanda == StatusDemanda.BUSINESS_CASE) {
      return StatusDemanda.TO_DO;
    } else if (statusDemanda == StatusDemanda.TO_DO) {
      return StatusDemanda.DESIGN_AND_BUILD;
    } else if (statusDemanda == StatusDemanda.DESIGN_AND_BUILD) {
      return StatusDemanda.SUPPORT;
    } else if (statusDemanda == StatusDemanda.SUPPORT) {
      return StatusDemanda.DONE;
    } else if (statusDemanda == StatusDemanda.DONE) {
      return StatusDemanda.DONE;
    }
    return null;
  }

  abrirModalHistorico() {
    this.modalHistorico.emit(this.dadosDemanda.codigoDemanda)
  }

  mostrarCancelarPropriaDemanda(){
    if(this.usuarioService.getCodigoUser() == this.dadosDemanda.solicitanteDemanda?.codigoUsuario){
      return true
    }
    return false;
  }

  confirmarChat() {
    this.confirmationService.confirm({
      message: 'Deseja realmente iniciar esta conversa?',
      dismissableMask: true,
      header: 'Iniciar Chat',
      accept: () => {
        this.route.navigate(["/tela-inicial/chat"]);
      }
    })
  };

  existeAta() {
    if (
      this.dadosDemanda.statusDemanda == StatusDemanda.TO_DO ||
      this.dadosDemanda.statusDemanda == StatusDemanda.SUPPORT ||
      this.dadosDemanda.statusDemanda == StatusDemanda.DESIGN_AND_BUILD ||
      this.dadosDemanda.statusDemanda == StatusDemanda.DONE
    ) {
      return true;
    }
    return false;
  }

  direcionarUsuario() {
    if (this.textoExibidoEmBotaoDependendoRota?.rota == '') {
      this.abrirModalMotivoReprovacao.emit(this.dadosDemanda);
    } else if (this.textoExibidoEmBotaoDependendoRota?.rota == 'avaliar') {
      this.verDocumentoProposta.emit(this.dadosDemanda);
    } else if (
      this.textoExibidoEmBotaoDependendoRota?.rota == 'adicionar a reuniao'
    ) {
      this.abrirModalCriarReuniao.emit(this.dadosDemanda);
    } else if (this.textoExibidoEmBotaoDependendoRota?.rota == 'ver em ata') {
      this.verDocumentoEmAta.emit();
    } else if (this.textoExibidoEmBotaoDependendoRota?.rota == 'avancar fase') {
      this.avancarStatusDemanda.emit({
        mensagem:
          'Tem certeza que deseja avançar a fase da demanda?<br>Ela avançará para o Status: ' +
          this.retornaProximoStatusDemanda(this.dadosDemanda.statusDemanda),
        codigoDemanda: this.dadosDemanda.codigoDemanda,
        statusDemanda: this.dadosDemanda.statusDemanda,
      });
    } else if (
      this.textoExibidoEmBotaoDependendoRota?.rota == 'ver documento'
    ) {
      this.verDocumentoProposta.emit(this.dadosDemanda);
    } else if (this.textoExibidoEmBotaoDependendoRota?.rota == 'parecer comissao') {
      this.abrirModalParecerComissao.emit(this.dadosDemanda)
    } else {
      this.route.navigate([this.textoExibidoEmBotaoDependendoRota?.rota]);
    }
  }

  exibicaoBotoes() {
    if (
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO &&
      this.nivelAcesso == NivelAcesso.Analista
    ) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota:
          '/tela-inicial/classificar-demanda/' + this.dadosDemanda.codigoDemanda,
        texto: 'Classificar Demanda',
      };
      return true;
    } else if (
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA &&
      this.nivelAcesso == NivelAcesso.Analista
    ) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: '/tela-inicial/proposta/' + this.dadosDemanda.codigoDemanda,
        texto: 'Criar Proposta',
      };
      return true;
    } else if (
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_APROVACAO &&
      this.nivelAcesso == NivelAcesso.GerenteNegocio
    ) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'avaliar',
        texto: 'Avaliar Demanda',
      };
      return true;
    } else if (this.exibirBotaoParecerComissao) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'parecer comissao',
        texto: 'Parecer Comissao',
      };
      return true;
    }

    else if (
      (this.dadosDemanda.statusDemanda == StatusDemanda.ASSESSMENT ||
        this.dadosDemanda.statusDemanda == StatusDemanda.BUSINESS_CASE) &&
      this.nivelAcesso == NivelAcesso.Analista
    ) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'adicionar a reuniao',
        texto: 'Adicionar Proposta',
      };
      return true;
    } else if (
      this.dadosDemanda.statusDemanda == StatusDemanda.TO_DO ||
      this.dadosDemanda.statusDemanda == StatusDemanda.DESIGN_AND_BUILD ||
      this.dadosDemanda.statusDemanda == StatusDemanda.SUPPORT
    ) {
      if (this.nivelAcesso == NivelAcesso.Analista) {
        this.textoExibidoEmBotaoDependendoRota = {
          rota: 'avancar fase',
          texto: 'Avançar Fase',
        };
      } else {
        this.textoExibidoEmBotaoDependendoRota = {
          rota: 'ver documento',
          texto: 'Ver Demanda',
        };
      }
      return true;
    } else if (this.dadosDemanda.statusDemanda == StatusDemanda.CANCELLED) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: '',
        texto: 'Motivo',
      };
      return true;
    } else if (this.exibirBotaoParecerDg) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: '',
        texto: 'Parecer da DG',
      };
      return true;
    } else if (this.dadosDemanda.statusDemanda == StatusDemanda.DRAFT) {
      this.rascunho = true
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'tela-inicial/rascunho/' + this.dadosDemanda.codigoDemanda,
        texto: 'Continuar Demanda',
      };
    } else if (this.dadosDemanda.statusDemanda == StatusDemanda.DRAFT_PROPOSTA) {
      this.rascunho = true
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'tela-inicial/proposta/' + this.dadosDemanda.codigoDemanda,
        texto: 'Continuar Demanda',
      };
    } else if (
      !this.isPauta &&
      !this.rascunho &&
      this.textoExibidoEmBotaoDependendoRota &&
      !this.exibirBotaoParecerComissao &&
      !this.exibirBotaoParecerDg
    ) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'ver documento',
        texto: 'Ver Demanda',
      };
      return true;
    } else {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'ver documento',
        texto: 'Ver Demanda',
      };
    }
    return true;
  }

  deleteRascunhoFromLocalStorage() {
    if (this.dadosDemanda.codigoDemanda) {
      this.rascunhoService.deleteRascunho(this.dadosDemanda.codigoDemanda)
      this.clicouEmExcluir.emit()
    } else {
      alert(
        "Código demanda is null: card-demanda"
      )
    }
  }

  existePauta() {
    if (
      this.dadosDemanda.statusDemanda == StatusDemanda.ASSESSMENT ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BUSINESS_CASE ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_APROVACAO ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA ||
      this.dadosDemanda.statusDemanda == StatusDemanda.CANCELLED
    ) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.primaryColorClass = this.dadosDemanda.statusDemanda;
    this.secondaryColorClass = this.dadosDemanda.statusDemanda + '-sec';

    this.exibicaoBotoes();
  }
}
