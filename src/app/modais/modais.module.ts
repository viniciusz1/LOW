import { DragDropModule } from 'primeng/dragdrop';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAtaDocumentoComponent } from './modal-ata-documento/modal-ata-documento.component';
import { ModalParecerComissaoPropostaComponent } from './modal-parecer-comissao-proposta/modal-parecer-comissao-proposta.component';
import { ModalDemandaDocumentoComponent } from './modal-demanda-documento/modal-demanda-documento.component';
import { ModalMotivoDevolucaoComponent } from './modal-motivo-devolucao/modal-motivo-devolucao.component';
import { MatSelectModule } from '@angular/material/select';
import { ComponentesReutilizaveisModule } from '../componentes-reutilizaveis/componentes-reutilizaveis.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalReprovacaoDemandaComponent } from './modal-reprovacao-demanda/modal-reprovacao-demanda.component';
import { TimelineModule } from 'primeng/timeline';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ModalHistoricoComponent } from './modal-historico/modal-historico.component';
import { ModalCriarReuniaoComponent } from './modal-criar-reuniao/modal-criar-reuniao.component';
import { CalendarModule } from 'primeng/calendar';
import { ModalCancelamentoReuniaoComponent } from './modal-cancelamento-reuniao/modal-cancelamento-reuniao.component';
import { SharedModule } from '../shared/shared.module';
import { ModalDgDocumentosComponent } from './modal-dg-documentos/modal-dg-documentos.component';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';
import { ModalRecomendacaoDemandaComponent } from './modal-recomendacao-demanda/modal-recomendacao-demanda.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    ModalAtaDocumentoComponent,
    ModalParecerComissaoPropostaComponent,
    ModalDemandaDocumentoComponent,
    ModalMotivoDevolucaoComponent,
    ModalReprovacaoDemandaComponent,
    ModalHistoricoComponent,
    ModalCriarReuniaoComponent,
    ModalCancelamentoReuniaoComponent,
    ModalDgDocumentosComponent,
    ModalRecomendacaoDemandaComponent,
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
    InputTextareaModule,
    ConfirmDialogModule,
    ScrollPanelModule,
    InputTextModule,
    CalendarModule,
    ReactiveFormsModule,
    DragDropModule,
    SharedModule,
    PaginatorModule,
    FileUploadModule,
    TableModule
  ],
  exports: [ModalDemandaDocumentoComponent],
})
export class ModaisModule {}
