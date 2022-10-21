import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSuaPautaComponent } from './modal-sua-pauta/modal-sua-pauta.component';
import { ModalPropostaDocumentoComponent } from './modal-proposta-documento/modal-proposta-documento.component';
import { ModalAtaDocumentoComponent } from './modal-ata-documento/modal-ata-documento.component';
import { ModalParecerComissaoPropostaComponent } from './modal-parecer-comissao-proposta/modal-parecer-comissao-proposta.component';
import { ModalFiltroDemandasComponent } from './modal-filtro-demandas/modal-filtro-demandas.component';
import { ModalDemandaDocumentoComponent } from './modal-demanda-documento/modal-demanda-documento.component';
import { ModalMotivoDevolucaoComponent } from './modal-motivo-devolucao/modal-motivo-devolucao.component';
import {MatSelectModule} from '@angular/material/select';
import { ComponentesReutilizaveisModule } from '../componentes-reutilizaveis/componentes-reutilizaveis.module';



@NgModule({
  declarations: [
    ModalSuaPautaComponent,
    ModalPropostaDocumentoComponent,
    ModalAtaDocumentoComponent,
    ModalParecerComissaoPropostaComponent,
    ModalFiltroDemandasComponent,
    ModalDemandaDocumentoComponent,
    ModalMotivoDevolucaoComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    ComponentesReutilizaveisModule
  ]
})
export class ModaisModule { }
