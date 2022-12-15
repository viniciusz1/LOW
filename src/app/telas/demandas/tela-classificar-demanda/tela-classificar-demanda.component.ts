import { DemandaAnalistaService } from './../../../services/demanda-analista.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';

interface BU {
  nomeBusinessUnit: string;
  codigoBusinessUnit: string;
}

@Component({
  selector: 'app-tela-classificar-demanda',
  templateUrl: './tela-classificar-demanda.component.html',
  styleUrls: ['./tela-classificar-demanda.component.scss'],
})
export class TelaClassificarDemandaComponent implements OnInit {
  BUs: BU[];
  demandaAnalistaForm = this.demandaAnalistaService.demandaAnalistaForm;
  selectedBUs: any;

  constructor(private matDialog: MatDialog, private fb: FormBuilder, private demandaAnalistaService: DemandaAnalistaService) {
    this.BUs = [
      { nomeBusinessUnit: 'WEG Digital', codigoBusinessUnit: 'WD' },
      { nomeBusinessUnit: 'Vendas', codigoBusinessUnit: 'VD' },
      { nomeBusinessUnit: 'Motores', codigoBusinessUnit: 'MT' },
      { nomeBusinessUnit: 'Trefilação', codigoBusinessUnit: 'TF' },
      { nomeBusinessUnit: 'Corpotativo', codigoBusinessUnit: 'CP' },
    ];
  }

  onSubmitClassificacaoDemanda(){
    console.log(this.demandaAnalistaForm.value)
  }

  openModalDemandaDocumento() {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
    });
  }
  opcoesDeTamanho = [
    'Muito Pequena',
    'Pequena',
    'Média',
    'Grande',
    'Muito Grande',
  ];
  sessoes = [
    'TI',
    'WSA',
    'Corp',
    'WEG SM',
  ];
  ngOnInit(): void {}
}
