import { FormsModule } from '@angular/forms';
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
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalReprovacaoDemandaComponent } from './modal-reprovacao-demanda/modal-reprovacao-demanda.component';
import {TimelineModule} from 'primeng/timeline';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    ModalSuaPautaComponent,
    ModalPropostaDocumentoComponent,
    ModalAtaDocumentoComponent,
    ModalParecerComissaoPropostaComponent,
    ModalFiltroDemandasComponent,
    ModalDemandaDocumentoComponent,
    ModalMotivoDevolucaoComponent,
    ModalReprovacaoDemandaComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    ComponentesReutilizaveisModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    TimelineModule,
    DropdownModule,
    InputTextareaModule
  ],
  exports: [
    ModalDemandaDocumentoComponent
  ]
})
export class ModaisModule { }
