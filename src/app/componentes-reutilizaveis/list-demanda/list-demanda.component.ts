import { Router } from '@angular/router';
import { Output, Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';

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

  @Input() dadosDemada: Demanda = {};
  @Input() mostrarBotao = true;
  @Input() mudarTamanho: string = '80vw';
  @Input('mostrarIconeAdicionar') demandaPequena = false;

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
    if(this.textoExibidoEmBotaoDependendoRota?.rota == ""){
      this.abrirModal.emit()
    }else if(this.textoExibidoEmBotaoDependendoRota?.rota == "abre documento"){
      this.verDocumentoProposta.emit()
    }
    else if(this.textoExibidoEmBotaoDependendoRota?.rota == "aprovar"){
      this.verDocumentoProposta.emit('gerente')
    }
    else if(this.textoExibidoEmBotaoDependendoRota?.rota == 'adicionar a reuniao'){
      this.abrirModalCriarReuniao.emit()
    }
    else{
      this.route.navigate([this.textoExibidoEmBotaoDependendoRota?.rota])
    }
  }

  exibicaoBotoes(){
    if(this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO){
      this.textoExibidoEmBotaoDependendoRota = {rota: "/tela-inicial/classificar-demanda", texto: "Classificar Demanda"}
    }
    else if(this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA){
      this.textoExibidoEmBotaoDependendoRota = {rota: "/tela-inicial/classificar-demanda", texto: "Criar Proposta"}
    }
    else if(this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG_APROVACAO){
      this.textoExibidoEmBotaoDependendoRota = {rota: "aprovar", texto: "Aprovar Demanda"}
    }
    else if(this.dadosDemada.statusDemanda == StatusDemanda.ASSESSMENT){
      this.textoExibidoEmBotaoDependendoRota = {rota: "adicionar a reuniao", texto: "Adicionar Proposta"}
    }
    else if(this.dadosDemada.statusDemanda == StatusDemanda.BUSINESS_CASE){
      this.textoExibidoEmBotaoDependendoRota = {rota: "adicionar a reuniao", texto: "Adicionar Proposta"}
    }
    else if(this.dadosDemada.statusDemanda == StatusDemanda.CANCELLED){
      this.textoExibidoEmBotaoDependendoRota = {rota: "", texto: "Ver Reprovação"}
    }else{
      this.textoExibidoEmBotaoDependendoRota = {rota: "abre documento", texto: "Ver Mais"}
    }
  }

  ngOnInit(): void {
    this.primaryColorClass = this.dadosDemada.statusDemanda;
    this.secondaryColorClass = this.dadosDemada.statusDemanda + "-sec";
    this.exibicaoBotoes()
  }

}
