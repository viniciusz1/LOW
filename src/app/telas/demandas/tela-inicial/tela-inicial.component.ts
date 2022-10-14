import { ModalParecerComissaoPropostaComponent } from './../../../modais/modal-parecer-comissao-proposta/modal-parecer-comissao-proposta.component';
import { ModalFiltroDemandasComponent } from './../../../modais/modal-filtro-demandas/modal-filtro-demandas.component';
import { Component, OnInit } from '@angular/core';
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import { ModalMotivoDevolucaoComponent } from 'src/app/modais/modal-motivo-devolucao/modal-motivo-devolucao.component';
import { ModalSuaPautaComponent } from 'src/app/modais/modal-sua-pauta/modal-sua-pauta.component';


@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent implements OnInit {

  constructor(public dialog: Dialog) { }

  position_list_cards = 0
  tipo_exibicao_demanda = true
  isCollapsed = true;
  isFiltrado = true;
  showSidebar = -25;


  moveSidebar(){
    if(this.showSidebar == 0){
      this.showSidebar = -25
    }else{
      this.showSidebar = 0
    }
  }

  openModalFiltroDemandas(){
    this.dialog.open(ModalFiltroDemandasComponent, {
      minWidth: '300px',
    });
  }
  openModalMotivoDevolucao() {
    this.dialog.open(ModalMotivoDevolucaoComponent, {
      minWidth: '300px',
    });
  }

  openModalParecerComissaoProposta() {
    this.dialog.open(ModalParecerComissaoPropostaComponent, {
      minWidth: '300px',
    });
  }

  openModalSuaPauta(){
    this.dialog.open(ModalSuaPautaComponent, {
      minWidth: '300px',
    });
  }

  change_right(){
    this.position_list_cards -= 700
  }
  change_to_list(){
    this.tipo_exibicao_demanda = false
  }

  change_exibicao(){
    this.tipo_exibicao_demanda = !this.tipo_exibicao_demanda
  }
  
  change_to_card(){
    this.tipo_exibicao_demanda = true
  }
  change_left() {
    this.position_list_cards += 700
  }
  ngOnInit(): void {
    this.openModalSuaPauta()
  }

}
