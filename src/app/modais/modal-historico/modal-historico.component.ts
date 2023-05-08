import { MatDialog } from '@angular/material/dialog';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { MessageService } from 'primeng/api';

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
        this.listaHistoricoDemandas = e;
      },
      error: (err) => {
        this.showError("Código não encontrado")
      },
    });
  }
  listaHistoricoDemandas: Demanda[] = [];
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

  ngOnInit(): void {}
}
