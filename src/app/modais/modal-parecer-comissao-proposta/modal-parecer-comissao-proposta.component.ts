import { ModalPropostaDocumentoComponent } from './../modal-proposta-documento/modal-proposta-documento.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-parecer-comissao-proposta',
  templateUrl: './modal-parecer-comissao-proposta.component.html',
  styleUrls: ['./modal-parecer-comissao-proposta.component.scss']
})
export class ModalParecerComissaoPropostaComponent implements OnInit {

  constructor(public dialogRef: DialogRef<ModalParecerComissaoPropostaComponent>,
    private matDialog: MatDialog) { }
  tipoAtaSelecionada: string = "";
  tipoAtas = [
    { name: 'Ata Publicada', value: '0' },
    { name: 'Ata não Publicada', value: '1' },
  ]
  openModalPropostaDocumento() {
    this.matDialog.open(ModalPropostaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
    });
  }
  ngOnInit(): void {
  }

}
