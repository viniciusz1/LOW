import { Demanda } from './../../../models/demanda.model';
import { ModalCriarReuniaoComponent } from './../../../modais/modal-criar-reuniao/modal-criar-reuniao.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService } from 'primeng/api';
import { TelaCalendarioComponent } from './../tela-calendario/tela-calendario.component';
import { Component, OnInit } from '@angular/core';
import { listaReunioes } from './listReunioes';
import { Reuniao } from 'src/app/models/reuniao.model';
import { fadeAnimation } from './../../../shared/app.animation';
import { textoTutorial } from 'src/app/shared/textoDoTutorial';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-reuniao.component.html',
  styleUrls: ['./tela-reuniao.component.scss'],
  animations: [fadeAnimation]
})

export class TelaReuniaoComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    public matDialog: MatDialog,

  ) { }
  opcoesOrdenacao = [{ name: 'Data', value: 'data' }, { name: 'Comissão', value: 'comissao' }]
  ordenarSelect = ""
  //tipoExibicao = true --> mostrar todas reuniões
  //tipoExibicao = false --> Cria nova pauta
  textoTutorial = textoTutorial
  showFiltro = false;
  showPesquisaEBotaoFiltro = true;
  dataReuniao: any;
  comissaoSelecionada: any;
  pesquisaDemanda: string = "";
  listaReunioes: Reuniao[] = listaReunioes;
  showSidebar = -350;
  pesquisaReuniao = "";
  mostrarBotaoModal = false;
  showFiltroComponent = false;
  modalDeConfirmacaoCancelamentoDemanda() {
    this.mostrarBotaoModal = false;
    this.confirmationService.confirm({
      blockScroll: false,
      closeOnEscape: false,
      dismissableMask: true,
      header: 'Cancelar Reunião',
      message: 'Você tem certeza que deseja cancelar esta reunião no dia 22/11/2022 as 16:40?',
      accept: () => {
        //Actual logic to perform a confirmation
      },
    });
  }

  modalMotivoCancelamentoDemanda() {
    this.mostrarBotaoModal = true;
    this.confirmationService.confirm({
      blockScroll: false,
      closeOnEscape: false,
      dismissableMask: true,
      header: 'Motivo do Cancelamento',
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, esse labore placeat soluta, eveniet voluptas debitis quod quaerat saepe, architecto recusandae provident repellendus fugiat expedita quos deleniti! Tempora, molestias illum?',
      accept: () => {
        //Actual logic to perform a confirmation
      },
    });
  }
  changeFilter() {
    if(this.showFiltro == true){
      this.showFiltroComponent = false
      setTimeout(() => {
        this.showFiltro = false
      }, 200)
    }else{
      this.showFiltro = true
      setTimeout(() => {
        this.showFiltroComponent = true
      }, 200)
    }
    
  }

  openModalCriarReuniao() {
    console.log("oi")
    this.matDialog.open(ModalCriarReuniaoComponent, {
      minWidth: '300px',
    });
  }

  openCalendario() {
    this.matDialog.open(TelaCalendarioComponent, {
      minWidth: '60vw',
    });
  }

  mudarStatusFiltro() {
    this.showFiltro = !this.showFiltro
    if (!this.showFiltro) {
      setTimeout(() => {
        this.showPesquisaEBotaoFiltro = !this.showPesquisaEBotaoFiltro
      }, 200)
    } else {
      this.showPesquisaEBotaoFiltro = !this.showPesquisaEBotaoFiltro
    }
  }

  ngOnInit() {
    // this.openModalCriarReuniao();
  }

  moveSidebar() {
    if (this.showSidebar == 0) {
      this.showSidebar = -350;
    } else {
      this.showSidebar = 0;
    }
  }
}
