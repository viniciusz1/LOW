import { Router } from '@angular/router';
import { Output, Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { NivelAcesso } from 'src/app/models/nivel-acesso.enum';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PersonalizacaoService } from 'src/app/services/personalizacao.service';

@Component({
  selector: 'app-list-demanda',
  templateUrl: './list-demanda.component.html',
  styleUrls: ['./list-demanda.component.scss']
})


export class ListDemandaComponent implements OnInit {
  primaryColorClass?: string = "";
  secondaryColorClass?: string = "";

  @Output() abrirModalMotivoReprovacao = new EventEmitter<Demanda>();
  @Output() verDocumentoProposta = new EventEmitter<Demanda>();
  @Output() clicouAdicionarPauta = new EventEmitter();
  @Output() modalHistorico = new EventEmitter();
  @Output() irParaChat = new EventEmitter();
  @Output() abrirModalCriarReuniao = new EventEmitter();
  @Output() verDocumentoEmAta = new EventEmitter();
  @Output() clicouEmExcluir = new EventEmitter();
  @Output() fechouModal = new EventEmitter();
  @Output() abrirModalReprovar = new EventEmitter<Demanda>()
  @Output() avancarStatusDemanda = new EventEmitter<{
    mensagem: string;
    codigoDemanda: string | undefined;
    statusDemanda: StatusDemanda | undefined;
  }>();

  @Input() isPauta: boolean = false;
  @Input() rascunho: boolean = false;
  @Input() tipoDeAta: string = '';
  @Input() exibirBotaoParecerComissao: boolean = false;
  @Input() exibirBotaoParecerDg: boolean = false;
  @Input() dadosDemanda: Demanda = {};
  @Input() mostrarBotao = true;
  @Input() mudarTamanho: string = '68vw';
  @Input('mostrarIconeAdicionar') demandaPequena = false;
  @Input() primaryColor?: string = '';
  @Input() secondaryColor: string = '';



  nivelAcesso: NivelAcesso = NivelAcesso.Analista;
  textoExibidoEmBotaoDependendoRota: { rota: string, texto: string } | undefined = undefined;

  constructor(private route: Router, 
    private usuarioService: UsuarioService, 
    private messageService: MessageService,
    private personalizacaoService: PersonalizacaoService) { }
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
  abrirModalHistorico() {
    console.log("clicou no historico");

    this.modalHistorico.emit(this.dadosDemanda.codigoDemanda)
  }

  exibirIniciarChat() {

    if (this.usuarioService.getRole == NivelAcesso.GestorTI || this.usuarioService.getRole == NivelAcesso.Analista) {

      if (this.dadosDemanda.analista == undefined) {
        return true;
      }
      //Se um outro analista já tiver iniciado a conversa, não exibe o botão
      else if (this.dadosDemanda.analista?.codigoUsuario == this.usuarioService.getCodigoUser()) {
        return true;
      }
      else if (this.dadosDemanda.analista?.codigoUsuario != this.usuarioService.getCodigoUser()) {
        return false;
      }
      if (this.dadosDemanda.solicitanteDemanda?.codigoUsuario == this.usuarioService.getCodigoUser()) {
        return true;
      }
    }
    return false;
  }

  formatarNumero(numero: number | undefined, casasDecimais: number): string {
    return numero !== undefined ? numero.toFixed(casasDecimais) : '';
  }

  mostrarCancelarPropriaDemanda() {
    if (this.usuarioService.getCodigoUser() == this.dadosDemanda.solicitanteDemanda?.codigoUsuario) {
      return true
    }
    return false;
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
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

  existePauta() {
    if (
      this.dadosDemanda.statusDemanda == StatusDemanda.ASSESSMENT ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BUSINESS_CASE ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA ||
      this.dadosDemanda.statusDemanda == StatusDemanda.CANCELLED
    ) {
      return false;
    }
    return true;
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
          'Tem certeza que deseja a fase da demanda?<br>Ela avançará para o Status: ' +
          this.retornaProximoStatusDemanda(this.dadosDemanda.statusDemanda),
        codigoDemanda: this.dadosDemanda.codigoDemanda,
        statusDemanda: this.dadosDemanda.statusDemanda,
      });
    } else if (
      this.textoExibidoEmBotaoDependendoRota?.rota == 'ver documento'
    ) {
      this.verDocumentoProposta.emit(this.dadosDemanda);
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
    } else if (
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
    } else if (this.exibirBotaoParecerComissao) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: '',
        texto: 'Parecer Comissao',
      };
      return true;
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
    } else if (!this.isPauta && this.rascunho) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: '',
        texto: 'Continuar Demanda',
      };
    } else {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'ver documento',
        texto: 'Ver Demanda',
      };
    }
    return true;
  }
  getOrdinalValueStatusDemanda(value: StatusDemanda | undefined): number | undefined {
    const enumValues = Object.values(StatusDemanda);
    const index = enumValues.indexOf(value as StatusDemanda);
    return index !== -1 ? index : undefined;
  }
  ngOnInit(): void {

    if(this.personalizacaoService.personalizacaoAtiva.coresPrimariasPersonalizacao && this.personalizacaoService.personalizacaoAtiva.coresSecundariasPersonalizacao){

      let ordinal = this.getOrdinalValueStatusDemanda(this.dadosDemanda.statusDemanda) as number
      this.primaryColor = this.personalizacaoService.personalizacaoAtiva.coresPrimariasPersonalizacao[ordinal]
      this.secondaryColor = this.personalizacaoService.personalizacaoAtiva.coresSecundariasPersonalizacao[ordinal]
    }

    this.primaryColorClass = this.dadosDemanda.statusDemanda;
    this.secondaryColorClass = this.dadosDemanda.statusDemanda + "-sec";
    this.exibicaoBotoes()
  }

}
