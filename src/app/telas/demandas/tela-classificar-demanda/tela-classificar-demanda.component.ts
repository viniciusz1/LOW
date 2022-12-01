import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';


@Component({
  selector: 'app-tela-classificar-demanda',
  templateUrl: './tela-classificar-demanda.component.html',
  styleUrls: ['./tela-classificar-demanda.component.scss']
})
export class TelaClassificarDemandaComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
    ) { }
  openModalDemandaDocumento() {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
    });
  }
  opcoesDeTamanhoDemanda = [
    {name:'Grande'},
    {name:'Muito Grande'},
    {name:'Média'},
    {name:'Pequena'}
  ]
  ngOnInit(): void {
  }

}
