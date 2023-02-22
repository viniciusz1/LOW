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
  aparecerRecomendacao: boolean = false;
  resultadoComissaoSelecionado: string = "";
  resultadoComissao = [
    { name: 'Aprovar', value: '0' },
    { name: 'Aprovar com Recomendação', value: '1' },
    { name: 'Reapresentar com Recomendação', value: '2' },
    { name: 'Reprovar', value: '3' },
  ]


  selecionaResultado(event: { value: { name: string, value: number }}){
    console.log(event.value.value);
    if(event.value.value == 1 || event.value.value == 2){
      this.aparecerRecomendacao = true;
    } else {
      this.aparecerRecomendacao = false;
    }
  }

  openModalPropostaDocumento() {
    this.matDialog.open(ModalPropostaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
    });
  }
  ngOnInit(): void {
  }

}
