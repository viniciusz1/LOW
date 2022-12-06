import { ModalCriarReuniaoComponent } from './../../../modais/modal-criar-reuniao/modal-criar-reuniao.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService } from 'primeng/api';
import { TelaCalendarioComponent } from './../tela-calendario/tela-calendario.component';
import { Component, OnInit } from '@angular/core';
import { listaReunioes } from './listReunioes';
import { Reuniao } from 'src/app/models/reuniao.model';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-reuniao.component.html',
  styleUrls: ['./tela-reuniao.component.scss'],
})
export class TelaReuniaoComponent implements OnInit {
  constructor(
    private confirmationService: ConfirmationService,
    public matDialog: MatDialog,
    
  ) {
  }

  showFiltro = false;
  listaReunioes: Reuniao[] = listaReunioes;
  showSidebar = -350;
  pesquisaReuniao = "";

  modalDeConfirmacaoCancelamentoDemanda() {
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


  openModalCriarReuniao(){
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
  }

  moveSidebar() {
    if (this.showSidebar == 0) {
      this.showSidebar = -350;
    } else {
      this.showSidebar = 0;
    }
  }
}
