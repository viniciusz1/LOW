import { ModalAtaDocumentoComponent } from './../../../modais/modal-ata-documento/modal-ata-documento.component';
import { ModalParecerComissaoPropostaComponent } from './../../../modais/modal-parecer-comissao-proposta/modal-parecer-comissao-proposta.component';
import { ModalFiltroDemandasComponent } from './../../../modais/modal-filtro-demandas/modal-filtro-demandas.component';
import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ModalMotivoDevolucaoComponent } from 'src/app/modais/modal-motivo-devolucao/modal-motivo-devolucao.component';
import { ModalSuaPautaComponent } from 'src/app/modais/modal-sua-pauta/modal-sua-pauta.component';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent implements OnInit {

  constructor(public dialog: Dialog,
    private matDialog: MatDialog,
    private demandasService: DemandaService
    ) { }

  position_list_cards = 0
  tipo_exibicao_demanda = false
  isCollapsed = true;
  isFiltrado = true;
  showSidebar = -25;
  listaDemandas: Demanda[] = []

  moveSidebar(){
    if(this.showSidebar == 0){
      this.showSidebar = -25
    }else{
      this.showSidebar = 0
    }
  }

  sortData(sort: Event) {
    console.log(sort)
  }

  openModalDemandaDocumento() {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
    });
  }

  openModalAtaDocumento(){
    this.matDialog.open(ModalAtaDocumentoComponent, {
      maxWidth: '70vw',
    });
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
    this.openModalAtaDocumento()
    // this.openModalFiltroDemandas()
    this.demandasService.getDemandas()
    .subscribe({next: (list) => {
      this.listaDemandas = list
    },
    error: (err) => {
      console.log(err)
    }})
  }

}
