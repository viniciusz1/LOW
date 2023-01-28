import { Component, OnInit } from '@angular/core';
import { BusinessUnit } from 'src/app/models/business-unit.model';
import { Secao } from 'src/app/models/secao.model';
import { DemandaAnalistaService } from 'src/app/services/demanda-analista.service';
import { MatDialog } from '@angular/material/dialog';
import { BusinessUnitService } from 'src/app/services/business-unit.service';
import { SecaoService } from 'src/app/services/secao.service';
import { ModalDemandaDocumentoComponent } from '../modal-demanda-documento/modal-demanda-documento.component';

@Component({
  selector: 'app-modal-classificar-demanda',
  templateUrl: './modal-classificar-demanda.component.html',
  styleUrls: ['./modal-classificar-demanda.component.scss']
})
export class ModalClassificarDemandaComponent implements OnInit {
  BUs: BusinessUnit[] = [];
  demandaAnalistaForm = this.demandaAnalistaService.demandaAnalistaForm;
  selectedBUs: any;
  opcoesDeTamanho = [
    {
      name: 'Muito Pequena',
      value: 'MuitoPequeno',
    },
    {
      name: 'Pequena',
      value: 'Pequeno',
    },
    {
      name: 'Média',
      value: 'Medio',
    },
    {
      name: 'Grande',
      value: 'Grande',
    },
    {
      name: 'Muito Grande',
      value: 'MuitoGrande',
    },
  ];
  secoes: Secao[] = [];
  constructor(
    private matDialog: MatDialog,
    private demandaAnalistaService: DemandaAnalistaService,
    private businessUnitService: BusinessUnitService,
    private secaoService: SecaoService
  ) {
    this.businessUnitService.getBusinessUnits().subscribe({
      next: (value) => {
        this.BUs = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.secaoService.getSecao().subscribe({
      next: (value) => {
        this.secoes = value;
        console.log(this.secoes)
      },
      error: (err) => {
        console.log(err);
      },
    });
   }
   onSubmitClassificacaoDemanda() {
    this.demandaAnalistaService.postProposta().subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  openModalDemandaDocumento() {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
    });
  }

  ngOnInit(): void {}
}
