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
        steps: ['bv', 'um', 'dois', 'tres', 'quatro', 'cinco', 'seis'],
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
  showSidebar = -25;
  listaDemandas: Demanda[] = []
  tipoRascunho = false;
  listaTituloNaoFiltrado: string[] = []
  pesquisaDemanda = ""


  changeRight(index: number) {
    if (this.positionListCards[index] > -2800) {
      this.positionListCards[index] -= 700
      console.log(this.positionListCards[index])
    }
  }
  changeLeft(index: number) {
    if (this.positionListCards[index] < 0) {
      this.positionListCards[index] += 700
      console.log(this.positionListCards[index])
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
      this.showSidebar = -25
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
    });
  }

  openModalReprovacaoDemanda() {
    this.dialog.open(ModalReprovacaoDemandaComponent), {
      maxWidth: '70vw',
    }
  }

  openModalDemandaDocumento() {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
    });
  }

  openModalAtaDocumento() {
    this.matDialog.open(ModalAtaDocumentoComponent, {
      maxWidth: '70vw',
    });
  }

  openModalFiltroDemandas() {
    this.dialog.open(ModalFiltroDemandasComponent, {
      minWidth: '300px',
    });
  }
  openModalMotivoDevolucao() {
    this.dialog.open(ModalMotivoDevolucaoComponent, {
      minWidth: '300px',
    });
  }

  openModalParecerComissaoProposta() {
    this.dialog.open(ModalParecerComissaoPropostaComponent, {
      minWidth: '300px',
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
