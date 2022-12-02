import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { StatusDemanda } from './../../../models/statusDemanda.enum';
import { Demanda } from './../../../models/demanda.model';
import { listaDemandas } from './../../demandas/tela-inicial/listDemandas';
import { TelaCalendarioComponent } from './../tela-calendario/tela-calendario.component';
import { FullCalendarElement } from '@fullcalendar/web-component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalSuaPautaComponent } from 'src/app/modais/modal-sua-pauta/modal-sua-pauta.component';
import { Component, OnInit } from '@angular/core';
import { listaReunioes } from './listReunioes';
import { Reuniao } from 'src/app/models/reuniao.model';
import { fadeAnimation } from './../../../shared/app.animation';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-reuniao.component.html',
  styleUrls: ['./tela-reuniao.component.scss'],
  animations: [fadeAnimation]
})
export class TelaReuniaoComponent implements OnInit {
  //tipoExibicao = true --> mostrar todas reuniões
  //tipoExibicao = false --> Cria nova pauta
  tipoExibicao = true;
  showFiltro = false;
  showPesquisaEBotaoFiltro = true;
  dataReuniao: any;
  comissaoSelecionada: any;
  pesquisaDemanda: string = "";
  listaReunioes: Reuniao[] = listaReunioes;

  listaDemandasEscolhidas: Demanda[] = [];
  draggedDemanda: Demanda | undefined = undefined;

  trocarExibicao(){
    if(this.tipoExibicao){
      this.router.navigate(['/tela-inicial/nova-pauta'])
    }else{      
      this.router.navigate(['/tela-inicial/reunioes'])
    }    
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
    this.listaDemandasEscolhidas.splice(this.listaDemandasEscolhidas.indexOf(demanda), 1);
    this.listaDemandas.push(demanda);
  }

  adicionarDemanda(demanda: Demanda) {
    this.listaDemandasEscolhidas.push(demanda);
    this.listaDemandas.splice(this.listaDemandas.indexOf(demanda), 1);
  }

  drop() {
    if (this.draggedDemanda) {
      let draggedProductIndex = this.findIndex(this.draggedDemanda);
      this.listaDemandasEscolhidas = [...this.listaDemandasEscolhidas, this.draggedDemanda];
      this.listaDemandas = this.listaDemandas.filter((val, i) => i != draggedProductIndex);
      this.draggedDemanda = undefined;
    }
  }

  dragEnd() {
    this.draggedDemanda = undefined;
  }

  showSidebar = -350;
  moveSidebar() {
    if (this.showSidebar == 0) {
      this.showSidebar = -350
    } else {
      this.showSidebar = 0
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

  constructor(
    public dialog: Dialog,
    private router: Router
    ) {
      if(router.url == '/tela-inicial/reunioes'){
        this.tipoExibicao = true;
      }else if(router.url == '/tela-inicial/nova-pauta'){        
        this.tipoExibicao = false;
      }
  }

  openCalendario() {
    this.dialog.open(TelaCalendarioComponent, {
      minWidth: '60vw'
    })
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

  ngOnInit() {
  }

  listaDeComissoesReuniao: string[] = ['Vendas', 'Compras', 'Financeiro', 'RH', 'Marketing', 'TI', 'Jurídico', 'Diretoria'];
  listaDemandas: Demanda[] = [{
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.CANCELLED,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }, {
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.TO_DO,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }, {
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.BUSINESS_CASE,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }, {
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.CANCELLED,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }, {
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.TO_DO,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }, {
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.BUSINESS_CASE,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }, {
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.BUSINESS_CASE,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }, {
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.CANCELLED,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }, {
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.TO_DO,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }, {
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.BUSINESS_CASE,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }, {
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.BUSINESS_CASE,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }, {
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.CANCELLED,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }, {
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.TO_DO,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }, {
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.BUSINESS_CASE,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }];
}
