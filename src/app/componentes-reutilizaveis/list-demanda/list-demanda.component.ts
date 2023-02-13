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
  @Output() verDocumentoProposta = new EventEmitter<string>();
  @Output() clicouAdicionarPauta = new EventEmitter();
  @Output() modalHistorico = new EventEmitter();
  @Output() irParaChat = new EventEmitter();
  @Output() abrirModalCriarReuniao = new EventEmitter();

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
      this.verDocumentoProposta.emit(this.dadosDemada.codigoDemanda);
    } else if (
      this.textoExibidoEmBotaoDependendoRota?.rota == 'adicionar a reuniao'
    ) {
      this.abrirModalCriarReuniao.emit(this.dadosDemada);
    } else if (
      this.textoExibidoEmBotaoDependendoRota?.rota == 'ver documento'
    ) {
      this.verDocumentoProposta.emit(this.dadosDemada.codigoDemanda);
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
