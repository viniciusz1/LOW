import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reuniao } from 'src/app/models/reuniao.model';
import { ReuniaoService } from 'src/app/services/reuniao.service';

@Component({
  selector: 'app-modal-dg-documentos',
  templateUrl: './modal-dg-documentos.component.html',
  styleUrls: ['./modal-dg-documentos.component.scss']
})
export class ModalDgDocumentosComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDgDocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reuniao,
    private reuniaoService: ReuniaoService) { }

  ngOnInit(): void {
  }
  numAtaDG: string = ''
  adicionarInfoDG() {
    this.reuniaoService.addInfoDG(this.listaFiles[0], this.data.codigoReuniao as number, this.numAtaDG)
      .subscribe((resposta) => {
        this.dialogRef.close(resposta);
      })
  }
  onUpload(event: any) {
    this.listaFiles = []
    this.listaFiles.push(event['files'][0] as File)
  }
  listaFiles: File[] = []
}
