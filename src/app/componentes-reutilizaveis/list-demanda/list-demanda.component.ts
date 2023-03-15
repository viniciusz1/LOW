import { Router } from '@angular/router';
import { Output, Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { NivelAcesso } from 'src/app/models/nivel-acesso.enum';

@Component({
  selector: 'app-list-demanda',
  templateUrl: './list-demanda.component.html',
  styleUrls: ['./list-demanda.component.scss']
})
export class ListDemandaComponent implements OnInit {
  primaryColorClass?: string = "";
  secondaryColorClass?: string = "";

  @Output() abrirModal = new EventEmitter();
  @Output() verDocumentoProposta = new EventEmitter<Demanda>();
  @Output() clicouAdicionarPauta = new EventEmitter();
  @Output() modalHistorico = new EventEmitter();
  @Output() irParaChat = new EventEmitter();
  @Output() abrirModalCriarReuniao = new EventEmitter();
  @Output() verDocumentoEmAta = new EventEmitter();
  @Output() avancarStatusDemanda = new EventEmitter<{
    mensagem: string;
    codigoDemanda: string | undefined;
    statusDemanda: StatusDemanda | undefined;
  }>();

  @Input() isPauta: boolean = false;
  @Input() rascunho: boolean = false;
  @Input() exibirBotaoParecerComissao: boolean = false;
  @Input() exibirBotaoParecerDg: boolean = false;
  @Input() dadosDemada: Demanda = {};
  @Input() mostrarBotao = true;
  @Input() mudarTamanho: string = '68vw';
  @Input('mostrarIconeAdicionar') demandaPequena = false;


  nivelAcesso: NivelAcesso = NivelAcesso.Analista;
  textoExibidoEmBotaoDependendoRota: {rota: string, texto: string} | undefined = undefined;

  constructor(private route: Router) { }
  statusPermitido() {
    if (
      this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO ||
      this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA ||
      this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_APROVACAO ||
      this.dadosDemada.statusDemanda == StatusDemanda.ASSESSMENT ||
      this.dadosDemada.statusDemanda == StatusDemanda.BUSINESS_CASE
    ) {
      return true;
    }
    return false;
  }
  abrirModalHistorico(){
    this.modalHistorico.emit(this.dadosDemada.codigoDemanda)
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
      this.dadosDemada.statusDemanda == StatusDemanda.TO_DO ||
      this.dadosDemada.statusDemanda == StatusDemanda.SUPPORT ||
      this.dadosDemada.statusDemanda == StatusDemanda.DESIGN_AND_BUILD ||
      this.dadosDemada.statusDemanda == StatusDemanda.DONE
    ) {
      return true;
    }
    return false;
  }

  existePauta() {
    if (
      this.dadosDemada.statusDemanda == StatusDemanda.ASSESSMENT ||
      this.dadosDemada.statusDemanda == StatusDemanda.BUSINESS_CASE ||
      this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO ||
      this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA ||
      this.dadosDemada.statusDemanda == StatusDemanda.CANCELLED
    ) {
      return false;
    }
    return true;
  }

  direcionarUsuario(){
    if (this.textoExibidoEmBotaoDependendoRota?.rota == '') {
      this.abrirModal.emit();
    } else if (this.textoExibidoEmBotaoDependendoRota?.rota == 'avaliar') {
      this.verDocumentoProposta.emit(this.dadosDemada);
    } else if (
      this.textoExibidoEmBotaoDependendoRota?.rota == 'adicionar a reuniao'
    ) {
      this.abrirModalCriarReuniao.emit(this.dadosDemada);
    } else if (this.textoExibidoEmBotaoDependendoRota?.rota == 'ver em ata') {
      this.verDocumentoEmAta.emit();
    } else if (this.textoExibidoEmBotaoDependendoRota?.rota == 'avancar fase') {
      this.avancarStatusDemanda.emit({
        mensagem:
          'Tem certeza que deseja a fase da demanda?<br>Ela avançará para o Status: ' +
          this.retornaProximoStatusDemanda(this.dadosDemada.statusDemanda),
        codigoDemanda: this.dadosDemada.codigoDemanda,
        statusDemanda: this.dadosDemada.statusDemanda,
      });
    } else if (
      this.textoExibidoEmBotaoDependendoRota?.rota == 'ver documento'
    ) {
      this.verDocumentoProposta.emit(this.dadosDemada);
    } else {
      this.route.navigate([this.textoExibidoEmBotaoDependendoRota?.rota]);
    }
  }

  exibicaoBotoes(){
    if (
      this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO &&
      this.nivelAcesso == NivelAcesso.Analista
    ) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota:
          '/tela-inicial/classificar-demanda/' + this.dadosDemada.codigoDemanda,
        texto: 'Classificar Demanda',
      };
      return true;
    } else if (
      this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA &&
      this.nivelAcesso == NivelAcesso.Analista
    ) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: '/tela-inicial/proposta/' + this.dadosDemada.codigoDemanda,
        texto: 'Criar Proposta',
      };
      return true;
    } else if (
      this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_APROVACAO &&
      this.nivelAcesso == NivelAcesso.GerenteNegocio
    ) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'avaliar',
        texto: 'Avaliar Demanda',
      };
      return true;
    } else if (
      (this.dadosDemada.statusDemanda == StatusDemanda.ASSESSMENT ||
        this.dadosDemada.statusDemanda == StatusDemanda.BUSINESS_CASE) &&
      this.nivelAcesso == NivelAcesso.Analista
    ) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'adicionar a reuniao',
        texto: 'Adicionar Proposta',
      };
      return true;
    } else if (
      this.dadosDemada.statusDemanda == StatusDemanda.TO_DO ||
      this.dadosDemada.statusDemanda == StatusDemanda.DESIGN_AND_BUILD ||
      this.dadosDemada.statusDemanda == StatusDemanda.SUPPORT
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
    } else if (this.dadosDemada.statusDemanda == StatusDemanda.CANCELLED) {
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

  ngOnInit(): void {
    this.primaryColorClass = this.dadosDemada.statusDemanda;
    this.secondaryColorClass = this.dadosDemada.statusDemanda + "-sec";
    this.exibicaoBotoes()
  }

}
