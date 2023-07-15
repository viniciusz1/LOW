import { MatDialog } from '@angular/material/dialog';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

import * as FileSaver from 'file-saver';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-modal-historico',
  templateUrl: './modal-historico.component.html',
  styleUrls: ['./modal-historico.component.scss'],
})
export class ModalHistoricoComponent implements OnInit {
  constructor(
    public dialogRef: DialogRef<ModalHistoricoComponent>,
    @Inject(DIALOG_DATA) public data: string,
    private demandaService: DemandaService,
    private matDialog: MatDialog,
    private messageService: MessageService
  ) {
    this.demandaService.getHistoricoDemandaByCodigo(data).subscribe({
      next: (e) => {
        this.listaHistoricoDemandas = []
        for (let i of e) {
          // const dataFormatada = this.datePipe.transform(i.dataCriacaoDemanda, 'dd/MM/yyyy HH:mm');
          // this.listaHistoricoDemandas.push({ ...i, isHistorico: true, dataCriacaoDemanda: dataFormatada });
          this.listaHistoricoDemandas.push({ ...i, isHistorico: true })
        }
      },
      error: (err) => {
        this.showError("Código não encontrado")
      },
    });
  }

  cols!: Column[];

  listaHistoricoDemandas: Demanda[] = [];
  demandasSelecionadas: Demanda[] = [];
  openModalDemandaDocumento(event: Demanda) {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: event
    });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  ngOnInit(): void { 
    this.cols = [
      { field: 'version', header: 'Versão', customExportHeader: 'Versão' },
      { field: 'dataCriacaoDemanda', header: 'Data de Criação' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
  ];
  }
}
