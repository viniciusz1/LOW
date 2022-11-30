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
  @Output() verDocumentoProposta = new EventEmitter();
  @Output() clicouAdicionarPauta = new EventEmitter();
  @Input() dadosDemada: Demanda = {};
  @Input() mostrarBotao = true;
  @Input('mostrarIconeAdicionar') demandaPequena = false;
  textoExibidoEmBotaoDependendoRota: {rota: string, texto: string} | undefined = undefined;

  constructor(private route: Router) { }

  direcionarUsuario(){
    if(this.textoExibidoEmBotaoDependendoRota?.rota == ""){
      this.abrirModal.emit()
    }else if(this.textoExibidoEmBotaoDependendoRota?.rota == "abre documento"){
      this.verDocumentoProposta.emit()
    }
    else{
      this.route.navigate([this.textoExibidoEmBotaoDependendoRota?.rota])
    }
  }
  exibicaoBotoes(){
    if(this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG){
      this.textoExibidoEmBotaoDependendoRota = {rota: "/tela-inicial/classificar-demanda", texto: "Classificar Demanda"}
    }
    else if(this.dadosDemada.statusDemanda == StatusDemanda.ASSESSMENT){
      this.textoExibidoEmBotaoDependendoRota = {rota: "/tela-inicial/nova-pauta", texto: "Adicionar Proposta"}
    }
    else if(this.dadosDemada.statusDemanda == StatusDemanda.BUSINESS_CASE){
      this.textoExibidoEmBotaoDependendoRota = {rota: "/tela-inicial/nova-pauta", texto: "Adicionar Proposta"}
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
