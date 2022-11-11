import { StatusDemanda } from './../../../models/statusDemanda.enum';
import { Demanda } from './../../../models/demanda.model';
import { listaDemandas } from './../../demandas/tela-inicial/listDemandas';
import { TelaCalendarioComponent } from './../tela-calendario/tela-calendario.component';
import { FullCalendarElement } from '@fullcalendar/web-component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalSuaPautaComponent } from 'src/app/modais/modal-sua-pauta/modal-sua-pauta.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-reuniao.component.html',
  styleUrls: ['./tela-reuniao.component.scss']
})
export class TelaReuniaoComponent implements OnInit {
  tipoExibicao = false;
  showFiltro = false;

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
  },{
    autorDemanda: "Sabrina Hegmann",
    statusDemanda: StatusDemanda.BUSINESS_CASE,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
  }]; 

  listaDemandasEscolhidas: Demanda[] = []; 
  draggedDemanda: Demanda | undefined = undefined;

  openModalSuaPauta(){
    this.dialog.open(ModalSuaPautaComponent, {
      minWidth: '300px',
    });
  }

  dragStart(demanda: Demanda) {
    this.draggedDemanda = demanda;
}

drop() {
  console.log("hey")
    if (this.draggedDemanda) {
        let draggedProductIndex = this.findIndex(this.draggedDemanda);
        this.listaDemandasEscolhidas = [...this.listaDemandasEscolhidas, this.draggedDemanda];
        this.listaDemandas = this.listaDemandas.filter((val,i) => i!=draggedProductIndex);
        this.draggedDemanda = undefined;
    }
}

dragEnd() {
    this.draggedDemanda = undefined;
}

findIndex(demanda: Demanda) {
    let index = -1;
    for(let i = 0; i < this.listaDemandas.length; i++) {
        if (demanda.codigoDemanda === this.listaDemandas[i].codigoDemanda) {
            index = i;
            break;
        }
    }
    return index;
}

  constructor(
    public dialog: Dialog,) {
  }

  openCalendario(){
    this.dialog.open(TelaCalendarioComponent, {
      minWidth:'60vw'
    })
  }

  ngOnInit() {
}}
