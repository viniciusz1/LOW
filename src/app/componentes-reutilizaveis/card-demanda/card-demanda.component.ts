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
  providers: [NgbDropdownConfig]
})
export class CardDemandaComponent implements OnInit {
  @Output() abrirModal = new EventEmitter();
  @Output() verDocumentoProposta = new EventEmitter()
  @Input() mudarTamanho: string = "370px"
  @Input() isPauta: boolean = false;
  @Input() dadosDemada: Demanda = {}
  @Input() rascunho: boolean = false;
  @Input() exibirBotaoParecerComissao: boolean = false;
  @Input() exibirBotaoParecerDg: boolean = false;

  @Output() clicouEmExcluir = new EventEmitter();
  usuario = "solicitante"
  primaryColorClass?: string = "";
  secondaryColorClass: string = "";

  constructor(private route: Router) {
    
  }

  direcionarUsuario(){
    if(this.textoExibidoEmBotaoDependendoRota?.rota == ""){
      this.abrirModal.emit()
    }else{
      this.route.navigate([this.textoExibidoEmBotaoDependendoRota?.rota])
    }
  }
  textoExibidoEmBotaoDependendoRota: {rota: string, texto: string} | undefined = undefined;

  botoes(){
    if(this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG){
      this.textoExibidoEmBotaoDependendoRota = {rota: "/tela-inicial/classificar-demanda", texto: "Classificar Demanda"}
    }
    if(this.dadosDemada.statusDemanda == StatusDemanda.ASSESSMENT){
      this.textoExibidoEmBotaoDependendoRota = {rota: "/tela-inicial/nova-pauta", texto: "Adicionar Proposta"}
    }
    if(this.dadosDemada.statusDemanda == StatusDemanda.BUSINESS_CASE){
      this.textoExibidoEmBotaoDependendoRota = {rota: "/tela-inicial/nova-pauta", texto: "Adicionar Proposta"}
    }
    // if(this.dadosDemada.statusDemanda == StatusDemanda.TO_DO){
    //   this.botao = {rota: "/demandas", texto: "Adicionar a Pauta"}
    // }
    if(this.dadosDemada.statusDemanda == StatusDemanda.CANCELLED){
      this.textoExibidoEmBotaoDependendoRota = {rota: "", texto: "Ver Reprovação"}
    }
  }

  ngOnInit(): void {
    this.primaryColorClass = this.dadosDemada.statusDemanda;
    this.secondaryColorClass = this.dadosDemada.statusDemanda + "-sec";

    this.botoes()
  }

}
