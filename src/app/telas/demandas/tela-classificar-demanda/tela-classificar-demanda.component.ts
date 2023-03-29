import { Arquivo } from './../../../models/arquivo.model';
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
import { FileUpload } from 'primeng/fileupload';



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
      data: this.demanda
    });
  }

  BUs: BusinessUnit[] = [];

  listaBUs = [
    {codigo: 1, nome: 'WMO-I – WEG Motores Industrial'},
    {codigo: 2, nome: 'WMO-C – WEG Motores Comercial'},
    {codigo: 3, nome: 'WEN  – WEG Energia'},
    {codigo: 4, nome: 'WAU – WEG Automação'},
    {codigo: 5, nome: 'WDS – WEG Digital e Sistemas'},
    {codigo: 6, nome: 'WDC – WEG Drives e Controls'},
    {codigo: 7, nome: 'WTI – WEG Tintas'},
    {codigo: 8, nome: 'WTD – WEG Transmissão e Distribuição'},
  ]

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

  listaSessoes = [
    {codigo: 1, nome: 'SVE – Seção Desenvolvimento Sistemas de Vendas e E-commerce'},
    {codigo: 2, nome: 'SIM – Seção Desenvolvimento Sistemas de manufatura'},
    {codigo: 3, nome: 'SIE – Seção Desenvolvimento Sistemas de Engenhar'},
    {codigo: 4, nome: 'SDO – Setor Desenvolvimento Plataforma Orchestra'},
    {codigo: 5, nome: 'SCO – Seção Desenvolvimento Sistemas Corporativos'},
    {codigo: 6, nome: 'PTI – Seção Projetos de TI'},
    {codigo: 7, nome: 'AGD – Seção Arquitetura e Governança de Dados'},
    {codigo: 8, nome: 'STD – Seção Desenvolvimento Tecnologias Digitais'},
    {codigo: 9, nome: 'TIN – Seção Tecnologia de Infraestrutura'},
    {codigo: 10, nome: 'SGI – Seção Suporte Global Infraestrutura'},
    {codigo: 11, nome: 'SEG – Seção Segurança da Informação e Riscos TI'},
    {codigo: 12, nome: 'AAS – Atendimento e serviços TI – América do Sul'},
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

  download(arquivo: Arquivo){
    this.demandaService.saveByteArray(arquivo.dadosArquivo, arquivo.tipoArquivo, arquivo.nomeArquivo)
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
