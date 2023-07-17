import { MatDialog } from '@angular/material/dialog';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

import * as FileSaver from 'file-saver';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
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
    private confirmationService: ConfirmationService,
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
  exportColumns!: ExportColumn[];

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

  modalMotivoReprovacao(motivo: string) {
    this.confirmationService.confirm({
      message: motivo,
      dismissableMask: true,
      header: 'Motivo da Reprovação',
      accept: () => {
        // this.route.navigate(['/tela-inicial/chat']);
      },
    });
  }

  ngOnInit(): void { 
    this.cols = [
      { field: 'version', header: 'Versão', customExportHeader: 'Versão' },
      { field: 'dataCriacaoDemanda', header: 'Data de Criação' },
      { field: 'autor', header: 'Autor' },
      { field: 'statusDemanda', header: 'Status' },
      { field: 'motivoReprovacaoDemanda', header: 'Motivo da Reprovação' },
      { field: 'codigoDemanda', header: 'Ver demanda'}
  ];

  this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.listaHistoricoDemandas);
            doc.save('HistoricoDemandas.pdf');
        });
    });
}

exportExcel() {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaHistoricoDemandas);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'HistoricoDemandas');
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
}
