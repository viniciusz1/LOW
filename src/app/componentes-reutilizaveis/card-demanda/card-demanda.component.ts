import { RotasModule } from './../../rotas.module';
import { StatusDemanda } from './../../models/statusDemanda.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Demanda } from 'src/app/models/demanda.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-card-demanda',
  templateUrl: './card-demanda.component.html',
  styleUrls: ['./card-demanda.component.scss'],
  providers: [NgbDropdownConfig],
})
export class CardDemandaComponent implements OnInit {
  @Output() abrirModal = new EventEmitter();
  @Output() abrirModalAvaliarDemanda = new EventEmitter();
  @Output() verDocumentoProposta = new EventEmitter();
  @Output() clicouEmExcluir = new EventEmitter();
  @Output() irParaChat = new EventEmitter();
  @Output() abrirModalCriarReuniao = new EventEmitter();
  @Output() modalHistorico = new EventEmitter();

  @Input() mudarTamanho: string = '390px';
  @Input() isPauta: boolean = false;
  @Input() dadosDemada: Demanda = {};
  @Input() rascunho: boolean = false;
  @Input() exibirBotaoParecerComissao: boolean = false;
  @Input() exibirBotaoParecerDg: boolean = false;
  @Input() tipoDeAta: string = '';

  textoExibidoEmBotaoDependendoRota:
    | { rota: string; texto: string }
    | undefined = undefined;
  usuario = '';
  primaryColorClass?: string = '';
  secondaryColorClass: string = '';

  constructor(private route: Router) {
    this.textoExibidoEmBotaoDependendoRota = {
      rota: '/tela-inicial/ver-pauta',
      texto: 'Ver em Ata',
    };
  }

  direcionarUsuario() {
    if (this.textoExibidoEmBotaoDependendoRota?.rota == '') {
      this.abrirModal.emit();
    }
    else if(this.textoExibidoEmBotaoDependendoRota?.rota == 'avaliar'){
      this.verDocumentoProposta.emit('gerente')
    }
    else if(this.textoExibidoEmBotaoDependendoRota?.rota == 'adicionar a reuniao'){
      this.abrirModalCriarReuniao.emit()
    }
    else {
      this.route.navigate([this.textoExibidoEmBotaoDependendoRota?.rota]);
    }
  }



  exibicaoBotoes() {
    if (this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: '/tela-inicial/classificar-demanda',
        texto: 'Classificar Demanda',
      };
    }
    else if (this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: '/tela-inicial/proposta/1',
        texto: 'Criar Proposta',
      };
    }
    else if (this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_APROVACAO) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'avaliar',
        texto: 'Avaliar Demanda',
      };
    }
    else if (this.dadosDemada.statusDemanda == StatusDemanda.ASSESSMENT) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'adicionar a reuniao',
        texto: 'Adicionar Proposta',
      };
    }
    else if (this.dadosDemada.statusDemanda == StatusDemanda.BUSINESS_CASE) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'adicionar a reuniao',
        texto: 'Adicionar Proposta',
      };
    }
    else if (this.dadosDemada.statusDemanda == StatusDemanda.CANCELLED) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: '',
        texto: 'Ver Reprovação',
      };
    }
  }
  existePauta() {
    if (
      this.dadosDemada.statusDemanda == StatusDemanda.ASSESSMENT ||
      this.dadosDemada.statusDemanda == StatusDemanda.BUSINESS_CASE ||
      this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO ||
      this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_APROVACAO ||
      this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA ||
      this.dadosDemada.statusDemanda == StatusDemanda.CANCELLED
    ) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.primaryColorClass = this.dadosDemada.statusDemanda;
    this.secondaryColorClass = this.dadosDemada.statusDemanda + '-sec';

    this.exibicaoBotoes();
  }
}
