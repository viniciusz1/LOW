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

  selectedBUs: any;

  constructor(private matDialog: MatDialog, private fb: FormBuilder) {
    this.BUs = [
      { nomeBusinessUnit: 'WEG Digital', codigoBusinessUnit: 'WD' },
      { nomeBusinessUnit: 'Vendas', codigoBusinessUnit: 'VD' },
      { nomeBusinessUnit: 'Motores', codigoBusinessUnit: 'MT' },
      { nomeBusinessUnit: 'Trefilação', codigoBusinessUnit: 'TF' },
      { nomeBusinessUnit: 'Corpotativo', codigoBusinessUnit: 'CP' },
    ];
  }
  classificacaoDemandaForm = this.fb.group({
    tamanhoDemanda: [''],
    buBeneficiadaDemanda: [''],
    buSolicitanteDemanda: [''],
    secaoDeTIResponsavelDemanda: [''],
    documentoDemanda: [''],
  });

  onSubmitClassificacaoDemanda(){
    console.log(this.classificacaoDemandaForm.value)
  }

  openModalDemandaDocumento() {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
    });
  }
  opcoesDeTamanho = [
    { name: 'Muito Pequena' },
    { name: 'Pequena' },
    { name: 'Média' },
    { name: 'Grande' },
    { name: 'Muito Grande' },
  ];
  sessoes = [
    { name: 'TI' },
    { name: 'WSA' },
    { name: 'Corp' },
    { name: 'WEG SM' },
  ];
  ngOnInit(): void {}
}
