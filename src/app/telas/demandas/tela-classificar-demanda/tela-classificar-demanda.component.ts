import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { Secao } from '../../../models/secao.model';
import { SecaoService } from '../../../services/secao.service';
import { BusinessUnitService } from './../../../services/business-unit.service';
import { BusinessUnit } from './../../../models/business-unit.model';
import { DemandaAnalistaService } from './../../../services/demanda-analista.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-tela-classificar-demanda',
  templateUrl: './tela-classificar-demanda.component.html',
  styleUrls: ['./tela-classificar-demanda.component.scss'],
})
export class TelaClassificarDemandaComponent implements OnInit {
  BUs: BusinessUnit[] = [];
  demanda: Demanda | undefined = undefined
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
  codigoDemandaRota = this.activatedRoute.snapshot.params['codigoDemanda'];
  constructor(
    private matDialog: MatDialog,
    private demandaAnalistaService: DemandaAnalistaService,
    private demandaService: DemandaService,
    private businessUnitService: BusinessUnitService,
    private secaoService: SecaoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.demandaService.getDemandaByCodigoDemanda(this.codigoDemandaRota).subscribe({
      next: (value) => {
        console.log(value)
        this.demanda = value;
      },
      error: (err) => {
        console.log(err);
      },
    });

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
    this.demandaAnalistaService.postProposta(this.demanda?.codigoDemanda).subscribe({
      next: e => {
        this.router.navigate(['/tela-inicial'])
      },
      error: err => {
        alert(err)
      }
    });
  }

  openModalDemandaDocumento(event: string | undefined) {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: event,
    });
  }

  ngOnInit(): void { }
}
