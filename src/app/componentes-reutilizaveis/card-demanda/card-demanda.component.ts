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
  @Output() verDocumentoEmAta = new EventEmitter();
  @Output() avancarStatusDemanda = new EventEmitter<{mensagem: string, codigoDemanda: string | undefined, statusDemanda: StatusDemanda | undefined}>();

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
      rota: 'ver em ata',
      texto: 'Ver em Ata',
    };
  }
  statusPermitido(){
    if(this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO || this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA || this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_APROVACAO || this.dadosDemada.statusDemanda == StatusDemanda.ASSESSMENT || this.dadosDemada.statusDemanda == StatusDemanda.BUSINESS_CASE){
      return true
    }
    return false
  }
  direcionarUsuario() {
    if (this.textoExibidoEmBotaoDependendoRota?.rota == '') {
      this.abrirModal.emit();
    }
    else if(this.textoExibidoEmBotaoDependendoRota?.rota == 'avaliar'){
      this.verDocumentoProposta.emit(this.dadosDemada.codigoDemanda)
    }
    else if(this.textoExibidoEmBotaoDependendoRota?.rota == 'adicionar a reuniao'){
      this.abrirModalCriarReuniao.emit()
    }
    else if(this.textoExibidoEmBotaoDependendoRota?.rota == 'ver em ata'){
      this.verDocumentoEmAta.emit()
    }
    else if(this.textoExibidoEmBotaoDependendoRota?.rota == 'avancar fase'){
      this.avancarStatusDemanda.emit({mensagem: "Tem certeza que deseja a fase da demanda?<br>Ela avançará para o Status: " + this.retornaProximoStatusDemanda(this.dadosDemada.statusDemanda), codigoDemanda: this.dadosDemada.codigoDemanda, statusDemanda: this.dadosDemada.statusDemanda})
    }
    else {
      this.route.navigate([this.textoExibidoEmBotaoDependendoRota?.rota]);
    }
  }

  retornaProximoStatusDemanda(statusDemanda: StatusDemanda | undefined){
    if(statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO){
      return StatusDemanda.BACKLOG_APROVACAO
    }else if(statusDemanda == StatusDemanda.BACKLOG_APROVACAO){
      return StatusDemanda.BACKLOG_PROPOSTA
    }else if(statusDemanda == StatusDemanda.BACKLOG_PROPOSTA){
      return StatusDemanda.ASSESSMENT
    }else if(statusDemanda == StatusDemanda.ASSESSMENT){
      return StatusDemanda.TO_DO
    }else if(statusDemanda == StatusDemanda.BUSINESS_CASE){
      return StatusDemanda.TO_DO
    }else if(statusDemanda == StatusDemanda.TO_DO){
      return StatusDemanda.DESIGN_AND_BUILD
    }else if(statusDemanda == StatusDemanda.DESIGN_AND_BUILD){
      return StatusDemanda.SUPPORT
    }else if(statusDemanda == StatusDemanda.SUPPORT){
      return StatusDemanda.DONE
    }else if(statusDemanda == StatusDemanda.DONE){
      return StatusDemanda.DONE
    }
    return null
  }

  existeAta(){
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


  exibicaoBotoes() {
    if (this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: '/tela-inicial/classificar-demanda/'+this.dadosDemada.codigoDemanda,
        texto: 'Classificar Demanda',
      };
    }
    else if (this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: '/tela-inicial/proposta/'+this.dadosDemada.codigoDemanda,
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
    else if (this.dadosDemada.statusDemanda == StatusDemanda.TO_DO || this.dadosDemada.statusDemanda == StatusDemanda.DESIGN_AND_BUILD || this.dadosDemada.statusDemanda == StatusDemanda.SUPPORT) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'avancar fase',
        texto: 'Avançar Fase',
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
