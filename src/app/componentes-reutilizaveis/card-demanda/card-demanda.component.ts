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
  @Output() clicouEmExcluir = new EventEmitter();
  usuario = "solicitante"
  primaryColorClass?: string = "";
  secondaryColorClass: string = "";

  constructor(private route: Router) {
    
  }

  direcionarUsuario(){
    if(this.botao?.rota == ""){
      this.abrirModal.emit()
    }else{
      this.route.navigate([this.botao?.rota])
    }
  }
  botao: {rota: string, texto: string} | undefined = undefined;

  botoes(){
    if(this.dadosDemada.statusDemanda == StatusDemanda.BACKLOG){
      this.botao = {rota: "/tela-inicial/proposta/1", texto: "Classificar Demanda"}
    }
    if(this.dadosDemada.statusDemanda == StatusDemanda.ASSESSMENT){
      this.botao = {rota: "/tela-inicial/data-comissao", texto: "Adicionar Proposta"}
    }
    if(this.dadosDemada.statusDemanda == StatusDemanda.BUSINESS_CASE){
      this.botao = {rota: "/tela-inicial/data-comissao", texto: "Adicionar Proposta"}
    }
    // if(this.dadosDemada.statusDemanda == StatusDemanda.TO_DO){
    //   this.botao = {rota: "/demandas", texto: "Adicionar a Pauta"}
    // }
    if(this.dadosDemada.statusDemanda == StatusDemanda.CANCELLED){
      this.botao = {rota: "", texto: "Ver Reprovação"}
    }
  }

  ngOnInit(): void {
    this.primaryColorClass = this.dadosDemada.statusDemanda;
    this.secondaryColorClass = this.dadosDemada.statusDemanda + "-sec";

    this.botoes()
  }

}
