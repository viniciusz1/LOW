import { Secao } from '../../../models/secao.model';
import { SecaoService } from '../../../services/secao.service';
import { BusinessUnitService } from './../../../services/business-unit.service';
import { BusinessUnit } from './../../../models/business-unit.model';
import { DemandaAnalistaService } from './../../../services/demanda-analista.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';


@Component({
  selector: 'app-tela-classificar-demanda',
  templateUrl: './tela-classificar-demanda.component.html',
  styleUrls: ['./tela-classificar-demanda.component.scss'],
})
export class TelaClassificarDemandaComponent implements OnInit {
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
