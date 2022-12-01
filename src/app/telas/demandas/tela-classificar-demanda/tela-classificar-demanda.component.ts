import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';

interface BU {
  name: string,
  code: string
}

@Component({
  selector: 'app-tela-classificar-demanda',
  templateUrl: './tela-classificar-demanda.component.html',
  styleUrls: ['./tela-classificar-demanda.component.scss']
})


export class TelaClassificarDemandaComponent implements OnInit {

  BUs: BU[];

  selectedBUs: any;

  constructor(
    private matDialog: MatDialog,
    ) {
      this.BUs = [
        {name: 'WEG Digital', code: 'WD'},
        {name: 'Vendas', code: 'VD'},
        {name: 'Motores', code: 'MT'},
        {name: 'Trefilação', code: 'TF'},
        {name: 'Corpotativo', code: 'CP'}
    ];
     }
  openModalDemandaDocumento() {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
    });
  }
  opcoesDeTamanhoDemanda = [
    {name:'Muito Pequena'},
    {name:'Pequena'},
    {name:'Média'},
    {name:'Grande'},
    {name:'Muito Grande'}
  ]
  sessoes = [
    {name:'TI'},
    {name:'WSA'},
    {name:'Corp'},
    {name:'WEG SM'}
  ]
  ngOnInit(): void {
  }

}
