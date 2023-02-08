import { ModalAtaDocumentoComponent } from './../../../modais/modal-ata-documento/modal-ata-documento.component';
import { ModalCriarReuniaoComponent } from './../../../modais/modal-criar-reuniao/modal-criar-reuniao.component';
import { fadeAnimation } from './../../../shared/app.animation';
import { StatusDemanda } from './../../../models/statusDemanda.enum';
import { ModalReprovacaoDemandaComponent } from './../../../modais/modal-reprovacao-demanda/modal-reprovacao-demanda.component';
import { Router } from '@angular/router';
import { ModalPropostaDocumentoComponent } from './../../../modais/modal-proposta-documento/modal-proposta-documento.component';
import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ModalMotivoDevolucaoComponent } from 'src/app/modais/modal-motivo-devolucao/modal-motivo-devolucao.component';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { JoyrideService } from 'ngx-joyride';
import { textoTutorial } from '../../../shared/textoDoTutorial';
import { ConfirmationService } from 'primeng/api';
import { ModalHistoricoComponent } from 'src/app/modais/modal-historico/modal-historico.component';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss'],
  animations: [fadeAnimation]
})
export class TelaInicialComponent implements OnInit {
  constructor(
    public dialog: Dialog,
    private matDialog: MatDialog,
    private demandasService: DemandaService,
    private router: Router,
    private readonly joyrideService: JoyrideService,
    private confirmationService: ConfirmationService
  ) {
    this.pesquisaAlterada
      .pipe(
        debounceTime(500))
      .subscribe(() => {
        this.pesquisarDemandas({solicitante: "", codigoDemanda: "", status: "", tamanho: "", analista: "", departamento: "", tituloDemanda: this.pesquisaDemanda})
  })
    if (router.url == '/tela-inicial/rascunhos') {
      this.tipoRascunho = true;
      this.isFiltrado = true;
    }
  }
  ordenarSelect =""
  opcoesOrdenacao=[
    {name: 'Data de criação', value: 'dataCriacao'},
    {name: 'Data de atualização', value: 'dataAtualizacao'},
    {name: 'Maior Score', value: 'autor'},
    {name: 'A-Z', value: 'autor'},
    {name: 'Z-A', value: 'autor'},
  ]

  pesquisaAlterada = new Subject<string>();
  textoTutorial = textoTutorial
  positionListCards: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  //true = card
  tipoExibicaoDemanda = true;
  isCollapsed: boolean[] = [true, true, true, true, true, true, true, true, true];
  isFiltrado = false;
  showFiltro = false;
  showPesquisaEBotaoFiltro = true;
  showSidebar = -350;
  listaDemandas: Demanda[] = []
  tipoRascunho = false;
  listaTituloNaoFiltrado: {status: string, titulo: string}[] = []
  pesquisaDemanda = ""
  nenhumResultadoEncontrado = false;
  listaDemandasRascunho: Demanda[] = [{
    scoreDemanda: 2034,
    statusDemanda: StatusDemanda.DRAFT,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
    ppmDemanda: "PPM 123456",
  }, {
    scoreDemanda: 2034,
    statusDemanda: StatusDemanda.DRAFT,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
    ppmDemanda: "PPM 123456",
  }]
  mudouCampodePesquisa(){
    this.pesquisaAlterada.next(this.pesquisaDemanda as string);
  }
  //Pesquisa demandas por status, ou por todos os campos, no caso o filtro de muitas informações
  pesquisarDemandas(event: { solicitante: string; codigoDemanda: string; status: string; tamanho: string; tituloDemanda: string; analista: string; departamento: string; } | string){
    if (typeof event === 'string') {
      this.demandasService.getDemandasFiltradas({solicitante: "", codigoDemanda: "", status: event, tamanho: "", tituloDemanda: "", analista: "", departamento: ""}).subscribe((listaDemandas: Demanda[]) => {
        if(listaDemandas.length > 0){
          this.listaDemandas = listaDemandas;
          this.isFiltrado = true;
          this.nenhumResultadoEncontrado = false;
        }else{
          this.isFiltrado = true;
          this.listaDemandas = [];
          this.nenhumResultadoEncontrado = true;
        }
      })
    }else{
      this.demandasService.getDemandasFiltradas(event).subscribe((listaDemandas: Demanda[]) => {
        if(listaDemandas.length > 0){
          this.listaDemandas = listaDemandas;
          this.isFiltrado = true;
          this.nenhumResultadoEncontrado = false;
        }else{
          this.isFiltrado = true;
          this.listaDemandas = [];
          this.nenhumResultadoEncontrado = true;
        }
      })
    }
  }
  irParaChat() {
    this.confirmationService.confirm({
      dismissableMask: true,
      blockScroll: false,
      message: 'Deseja realmente iniciar uma conversa sobre esta demanda?',
      accept: () => {
        this.router.navigate(['/tela-inicial/chat'])
      }
    })
  };
  excluirDemandaRascunho(index: number) {
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
      minWidth: '50vw'
    });
  }

  openModalReprovacaoDemanda() {
    this.matDialog.open(ModalReprovacaoDemandaComponent), {
      maxWidth: '70vw',
      minWidth: '50vw',
    }
  }

  openModalDemandaDocumento(event: string) {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: event
    });
  }
  openModalHistorico() {
    this.matDialog.open(ModalHistoricoComponent, {
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

  openModalCriarReuniao(){
    console.log("oi")
    this.matDialog.open(ModalCriarReuniaoComponent, {
      minWidth: '300px',
    });
  }

  openModalAtaDocumento() {
    this.matDialog.open(ModalAtaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
    });
  }

  exibirFilasDeStatus() {
    if (this.listaDemandas.some(e => e.statusDemanda?.toString() == 'BACKLOG_CLASSIFICACAO')) {
      this.listaTituloNaoFiltrado.push({status: "BACKLOG_CLASSIFICACAO",titulo: "Backlog - Classificação"})
    }
    if (this.listaDemandas.some(e => e.statusDemanda?.toString() == 'BACKLOG_APROVACAO')) {
      this.listaTituloNaoFiltrado.push({status: "BACKLOG_APROVACAO",titulo: "Backlog - Aprovação"})
    }
    if (this.listaDemandas.some(e => e.statusDemanda?.toString() == 'BACKLOG_PROPOSTA')) {
      this.listaTituloNaoFiltrado.push({status: "BACKLOG_PROPOSTA",titulo: "Backlog - Propostas"})
    }
    if (this.listaDemandas.some(e => e.statusDemanda?.toString() == 'BUSINESS_CASE')) {
      this.listaTituloNaoFiltrado.push({status: "BUSINESS_CASE",titulo: "Business Case"})
    }
    if (this.listaDemandas.some(e => e.statusDemanda?.toString() == 'ASSESSMENT')) {
      this.listaTituloNaoFiltrado.push({status: "ASSESSMENT",titulo: "Assessment"})
    }
    if (this.listaDemandas.some(e => e.statusDemanda?.toString() == 'TO_DO')) {
      this.listaTituloNaoFiltrado.push({status: "TO_DO",titulo: "To Do"})
    }
    if (this.listaDemandas.some(e => e.statusDemanda?.toString() == 'DESIGN_AND_BUILD')) {
      this.listaTituloNaoFiltrado.push({status: "DESIGN_AND_BUILD",titulo: "Design and Build"})
    }
    if (this.listaDemandas.some(e => e.statusDemanda?.toString() == 'SUPPORT')) {
      this.listaTituloNaoFiltrado.push({status: "SUPPORT",titulo: "Support"})
    }
    if (this.listaDemandas.some(e => e.statusDemanda?.toString() == 'CANCELLED')) {
      this.listaTituloNaoFiltrado.push({status: "CANCELLED",titulo: "Cancelled"})
    }
    if (this.listaDemandas.some(e => e.statusDemanda?.toString() == 'DONE')) {
      this.listaTituloNaoFiltrado.push({status: "DONE",titulo: "Done"})
    }
  }

  mudarStatusFiltro(){
      this.showFiltro = !this.showFiltro
      if(!this.showFiltro){
        setTimeout(()=>{
        this.showPesquisaEBotaoFiltro = !this.showPesquisaEBotaoFiltro
        },200)
      }else{
        this.showPesquisaEBotaoFiltro = !this.showPesquisaEBotaoFiltro
      }
  }

  carregarDemandasIniciais(){
    this.listaDemandas = []
    this.demandasService.getDemandasTelaInicial()
    .subscribe({
      next: (e) => {
        e.forEach((demandas) => {
          if(demandas.length > 0){
            this.listaDemandas.push(...demandas)
              this.isFiltrado = false;
          }
        })
        this.exibirFilasDeStatus()

      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    // this.listaDemandas = listaDemandas
   this.carregarDemandasIniciais()
  }

}
