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
import { ModalReprovacaoDemandaComponent } from 'src/app/modais/modal-reprovacao-demanda/modal-reprovacao-demanda.component';



@Component({
  selector: 'app-tela-classificar-demanda',
  templateUrl: './tela-classificar-demanda.component.html',
  styleUrls: ['./tela-classificar-demanda.component.scss'],
})
export class TelaClassificarDemandaComponent implements OnInit {

  openModalReprovacao() {
    this.matDialog.open(ModalReprovacaoDemandaComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
    });
  }

  BUs: BusinessUnit[] = [];
  demanda: Demanda | undefined = undefined
  demandaAnalistaForm = this.demandaAnalistaService.demandaAnalistaForm;
  selectedBUs: any;

  listaBUs = [
    {
      codigo: 0,
      name: 'WMO-I – WEG Motores Industrial',
      valueBu: 'WMOI'
    },
    {
      codigo: 1,
      name: 'WMO-C – WEG Motores Comercial',
      valueBu: 'WMOC'
    },
    {
      codigo: 2,
      name: 'WEN  – WEG Energia',
      valueBu: 'WEN'
    },
    {
      codigo: 3,
      name: 'WAU – WEG Automação',
      valueBu: 'WAU'
    },
    {
      codigo: 4,
      name: 'WDS – WEG Digital e Sistemas',
      valueBu: 'WDS'
    },
    {
      codigo: 5,
      name: 'WDC – WEG Drives e Controls',
      valueBu: 'WDC'
    },
    {
      codigo: 6,
      name: 'WTI – WEG Tintas',
      valueBu: 'WTI'
    },
    {
      codigo: 7,
      name: 'WTD – WEG Transmissão e Distribuição',
      valueBu: 'WTD'
    },
  ];

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

  listaSessoes = [
    {
      codigo: 1,
      name: 'SVE – Seção Desenvolvimento Sistemas de Vendas e E-commerce',
      valueSessao:'SVE'
    },
    {
      codigo: 2,
      name: 'SIM – Seção Desenvolvimento Sistemas de manufatura',
      valueSessao:'SIM'
    },
    {
      codigo: 3,
      name: 'SIE – Seção Desenvolvimento Sistemas de Engenhar',
      valueSessao:'SIE'
    },
    {
      codigo: 4,
      name: 'SDO – Setor Desenvolvimento Plataforma Orchestra',
      valueSessao:'SDO'
    },
    {
      codigo: 5,
      name: 'SCO – Seção Desenvolvimento Sistemas Corporativos',
      valueSessao:'SCO'
    },
    {
      codigo: 6,
      name: 'PTI – Seção Projetos de TI',
      valueSessao:'PTI'
    },
    {
      codigo: 7,
      name: 'AGD – Seção Arquitetura e Governança de Dados',
      valueSessao:'AGD'
    },
    {
      codigo: 8,
      name: 'STD – Seção Desenvolvimento Tecnologias Digitais',
      valueSessao:'STD'
    },
    {
      codigo: 9,
      name: 'TIN – Seção Tecnologia de Infraestrutura',
      valueSessao:'TIN'
    },
    {
      codigo: 10,
      name: 'SGI – Seção Suporte Global Infraestrutura',
      valueSessao:'SGI'
    },
    {
      codigo: 11,
      name: 'SEG – Seção Segurança da Informação e Riscos TI',
      valueSessao:'SEG'
    },
    {
      codigo: 12,
      name: 'AAS – Atendimento e serviços TI – América do Sul',
      valueSessao:'AAS'
    },
  ]

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

  openModalDemandaDocumento() {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: this.demanda,
    });
  }

  ngOnInit(): void { }
}
