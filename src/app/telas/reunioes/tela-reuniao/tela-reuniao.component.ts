import { Demanda } from './../../../models/demanda.model';
import { ModalCriarReuniaoComponent } from './../../../modais/modal-criar-reuniao/modal-criar-reuniao.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService } from 'primeng/api';
import { TelaCalendarioComponent } from './../tela-calendario/tela-calendario.component';
import { Component, OnInit } from '@angular/core';
import { Reuniao } from 'src/app/models/reuniao.model';
import { fadeAnimation } from './../../../shared/app.animation';
import { textoTutorial } from 'src/app/shared/textoDoTutorial';
import { ReuniaoService } from 'src/app/services/reuniao.service';
import { StatusReuniao } from 'src/app/models/statusReuniao.enum';

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
    private reuniaoService: ReuniaoService
  ) { }
  opcoesOrdenacao = [{ name: 'Data', value: 'data' }, { name: 'Comissão', value: 'comissao' }]
  ordenarSelect = ""
  //tipoExibicao = true --> mostrar todas reuniões
  //tipoExibicao = false --> Cria nova pauta
  textoTutorial = textoTutorial
  showPesquisaEBotaoFiltro = true;
  dataReuniao: any;
  comissaoSelecionada: any;
  pesquisaDemanda: string = "";
  listaReunioes: Reuniao[] = [];
  showSidebar = -350;
  pesquisaReuniao = "";
  mostrarBotaoModal = false;
  showFiltroComponent = false;
  modalDeConfirmacaoCancelamentoDemanda(reuniao: Reuniao) {
    this.mostrarBotaoModal = false;
    this.confirmationService.confirm({
      blockScroll: false,
      closeOnEscape: false,
      dismissableMask: true,
      header: 'Cancelar Reunião',
      message: 'Você tem certeza que deseja cancelar esta reunião no dia 22/11/2022 as 16:40?',
      accept: () => {
        reuniao.statusReuniao = StatusReuniao.CANCELADO
        this.reuniaoService.putReuniao(reuniao).subscribe(e => {
          console.log(e)
        })
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

  ngOnInit() {
    // this.openModalCriarReuniao();
    this.atualizarReunioes();
  }

  atualizarReunioes() {
    this.reuniaoService
      .getReuniao()
      .subscribe({
        next: (reuniao) => (this.listaReunioes = reuniao),
        error: (err) => console.log(err),
      });
  }

  pesquisarReunioes(event: {
    nomeComissao: string;
    dataReuniao: string;
    statusReuniao: string;
    ppmProposta: string;
    analista: string;
    solicitante: string;
    page: string;
    size: string
  }){
      this.reuniaoService.getReuniaoFiltrada(event).subscribe({
        next: (reuniao) => (this.listaReunioes = reuniao),
        error: (err) => console.log(err),
      });
  }

  moveSidebar() {
    if (this.showSidebar == 0) {
      this.showSidebar = -350;
    } else {
      this.showSidebar = 0;
    }
  }
}
