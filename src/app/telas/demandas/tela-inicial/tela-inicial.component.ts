import { StatusDemanda } from './../../../models/statusDemanda.enum';
import { ModalReprovacaoDemandaComponent } from './../../../modais/modal-reprovacao-demanda/modal-reprovacao-demanda.component';
import { Router } from '@angular/router';
import { ModalPropostaDocumentoComponent } from './../../../modais/modal-proposta-documento/modal-proposta-documento.component';
import { ModalAtaDocumentoComponent } from './../../../modais/modal-ata-documento/modal-ata-documento.component';
import { ModalParecerComissaoPropostaComponent } from './../../../modais/modal-parecer-comissao-proposta/modal-parecer-comissao-proposta.component';
import { ModalFiltroDemandasComponent } from './../../../modais/modal-filtro-demandas/modal-filtro-demandas.component';
import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ModalMotivoDevolucaoComponent } from 'src/app/modais/modal-motivo-devolucao/modal-motivo-devolucao.component';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { listaDemandas } from './listDemandas';
import { JoyrideService } from 'ngx-joyride';
import { textoTutorial } from './textoDoTutorial';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent implements OnInit {
  constructor(
    public dialog: Dialog,
    private matDialog: MatDialog,
    private demandasService: DemandaService,
    private router: Router,
    private readonly joyrideService: JoyrideService
  ) {
    if (router.url == '/tela-inicial/rascunhos') {
      this.tipoRascunho = true;
      this.isFiltrado = true;
    }
  }

  onClick() {
    console.log(textoTutorial)
    this.joyrideService.startTour(
      {
        steps: ['bv', 'um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete'],
      }
    );
  }
  textoTutorial = textoTutorial
  positionListCards: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  //true = card
  tipoExibicaoDemanda = true;
  isCollapsed: boolean[] = [true, true, true, true, true, true, true, true, true];
  isFiltrado = false;
  showFiltro = false;
  showSidebar = -350;
  listaDemandas: Demanda[] = []
  tipoRascunho = false;
  listaTituloNaoFiltrado: string[] = []
  pesquisaDemanda = ""
  listaDemandasRascunho: Demanda[] = [ {
    autorDemanda: "Sabrina Hegmann",
    scoreDemanda: 2034,
    statusDemanda: StatusDemanda.DRAFT,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
    ppmDemanda: "PPM 123456",
  },{
    autorDemanda: "Sabrina Hegmann",
    scoreDemanda: 2034,
    statusDemanda: StatusDemanda.DRAFT,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
    ppmDemanda: "PPM 123456",
  }]

  excluirDemandaRascunho(index: number){
    this.listaDemandasRascunho = this.listaDemandasRascunho.splice(1, index)
  }

  changeRight(index: number) {
    if (this.positionListCards[index] > -5000) {
      this.positionListCards[index] -= 700
    }
  }
  changeLeft(index: number) {
    if (this.positionListCards[index] < 0) {
      this.positionListCards[index] += 700
    }
  }

  changeToList() {
    this.tipoExibicaoDemanda = false
  }

  changeExibicao() {
    this.tipoExibicaoDemanda = !this.tipoExibicaoDemanda
  }

  changeToCard() {
    this.tipoExibicaoDemanda = true
  }



  moveSidebar() {
    if (this.showSidebar == 0) {
      this.showSidebar = -350
    } else {
      this.showSidebar = 0
    }
  }

  sortData(sort: Sort) {
    console.log(sort)
  }

  openModalPropostaDocumento() {
    this.matDialog.open(ModalPropostaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
    });
  }

  openModalReprovacaoDemanda() {
    this.matDialog.open(ModalReprovacaoDemandaComponent), {
      maxWidth: '70vw',
      minWidth: '50vw',
    }
  }

  openModalDemandaDocumento() {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
    });
  }



  openModalMotivoDevolucao() {
    this.matDialog.open(ModalMotivoDevolucaoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
    });
  }




  exibirFilasDeStatus() {
    if (this.listaDemandas.some(e => e.statusDemanda == 'backlog')) {
      this.listaTituloNaoFiltrado.push("Backlog - Classificação")
    }
    if (this.listaDemandas.some(e => e.statusDemanda == 'backlog')) {
      this.listaTituloNaoFiltrado.push("Backlog - Propostas")
    }
    if (this.listaDemandas.some(e => e.statusDemanda == 'assessment')) {
      this.listaTituloNaoFiltrado.push("Assessment")
    }
    if (this.listaDemandas.some(e => e.statusDemanda == 'business-case')) {
      this.listaTituloNaoFiltrado.push("Business Case")
    }
    if (this.listaDemandas.some(e => e.statusDemanda == 'to-do')) {
      this.listaTituloNaoFiltrado.push("To Do")
    }
    if (this.listaDemandas.some(e => e.statusDemanda == 'design-and-build')) {
      this.listaTituloNaoFiltrado.push("Design and Build")
    }
    if (this.listaDemandas.some(e => e.statusDemanda == 'support')) {
      this.listaTituloNaoFiltrado.push("Support")
    }
    if (this.listaDemandas.some(e => e.statusDemanda == 'cancelled')) {
      this.listaTituloNaoFiltrado.push("Cancelled")
    }
    if (this.listaDemandas.some(e => e.statusDemanda == 'done')) {
      this.listaTituloNaoFiltrado.push("Done")
    }
  }

  ngOnInit(): void {
    // this.openModalPropostaDocumento()
    // this.openModalAtaDocumento()
    // this.openModalDemandaDocumento()
    // this.openModalMotivoDevolucao()
    // this.openModalParecerComissaoProposta()
    // this.openModalReprovacaoDemanda()
    // this.openModalFiltroDemandas()

    
    this.demandasService.getDemandas()
      .subscribe({
        next: (list) => {
          this.listaDemandas = list
          console.log(this.listaDemandas)
          this.testandoEsquemaExibicaoDemandas()
          this.exibirFilasDeStatus()
        },
        error: (err) => {
          console.log(err)
        }
      })
  }
  testandoEsquemaExibicaoDemandas() {
    this.listaDemandas = []
    this.listaDemandas.push(...listaDemandas)
  }
}
