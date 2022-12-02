import { ConfirmationService } from 'primeng/api';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { StatusDemanda } from './../../../models/statusDemanda.enum';
import { Demanda } from './../../../models/demanda.model';
import { listaDemandas } from '../../../shared/listDemandas';
import { TelaCalendarioComponent } from './../tela-calendario/tela-calendario.component';
import { FullCalendarElement } from '@fullcalendar/web-component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalSuaPautaComponent } from 'src/app/modais/modal-sua-pauta/modal-sua-pauta.component';
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
    public dialog: Dialog,
    private router: Router
  ) {
    if (router.url == '/tela-inicial/reunioes') {
      this.tipoExibicao = true;
    } else if (router.url == '/tela-inicial/nova-pauta') {
      this.tipoExibicao = false;
    }
  }

  //tipoExibicao = true --> mostrar todas reuniões
  //tipoExibicao = false --> Cria nova pauta
  tipoExibicao = true;
  showFiltro = false;
  dataReuniao: any;
  comissaoSelecionada: any;
  pesquisaDemanda: string = '';
  listaReunioes: Reuniao[] = listaReunioes;
  listaDemandasEscolhidas: Demanda[] = [];
  draggedDemanda: Demanda | undefined = undefined;
  showSidebar = -350;
  listaDeComissoesReuniao: string[] = [
    'Vendas',
    'Compras',
    'Financeiro',
    'RH',
    'Marketing',
    'TI',
    'Jurídico',
    'Diretoria',
  ];

  trocarExibicao() {
    if (this.tipoExibicao) {
      this.router.navigate(['/tela-inicial/nova-pauta']);
    } else {
      this.router.navigate(['/tela-inicial/reunioes']);
    }
  }

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

  openModalSuaPauta() {
    this.dialog.open(ModalSuaPautaComponent, {
      minWidth: '300px',
    });
  }

  dragStart(demanda: Demanda) {
    this.draggedDemanda = demanda;
  }

  excluirDemanda(demanda: Demanda) {
    this.listaDemandasEscolhidas.splice(
      this.listaDemandasEscolhidas.indexOf(demanda),
      1
    );
    this.listaDemandas.push(demanda);
  }

  adicionarDemanda(demanda: Demanda) {
    this.listaDemandasEscolhidas.push(demanda);
    this.listaDemandas.splice(this.listaDemandas.indexOf(demanda), 1);
  }

  drop() {
    if (this.draggedDemanda) {
      let draggedProductIndex = this.findIndex(this.draggedDemanda);
      this.listaDemandasEscolhidas = [
        ...this.listaDemandasEscolhidas,
        this.draggedDemanda,
      ];
      this.listaDemandas = this.listaDemandas.filter(
        (val, i) => i != draggedProductIndex
      );
      this.draggedDemanda = undefined;
    }
  }

  dragEnd() {
    this.draggedDemanda = undefined;
  }

  moveSidebar() {
    if (this.showSidebar == 0) {
      this.showSidebar = -350;
    } else {
      this.showSidebar = 0;
    }
  }

  findIndex(demanda: Demanda) {
    let index = -1;
    for (let i = 0; i < this.listaDemandas.length; i++) {
      if (demanda.codigoDemanda === this.listaDemandas[i].codigoDemanda) {
        index = i;
        break;
      }
    }
    return index;
  }

  openCalendario() {
    this.dialog.open(TelaCalendarioComponent, {
      minWidth: '60vw',
    });
  }

  ngOnInit() {}

  listaDemandas: Demanda[] = [
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.CANCELLED,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.TO_DO,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.BUSINESS_CASE,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.CANCELLED,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.TO_DO,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.BUSINESS_CASE,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.BUSINESS_CASE,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.CANCELLED,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.TO_DO,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.BUSINESS_CASE,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.BUSINESS_CASE,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.CANCELLED,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.TO_DO,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {
      autorDemanda: 'Sabrina Hegmann',
      statusDemanda: StatusDemanda.BUSINESS_CASE,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
  ];
}
