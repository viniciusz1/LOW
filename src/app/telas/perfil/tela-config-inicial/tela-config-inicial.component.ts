
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';

@Component({
  selector: 'app-tela-config-inicial',
  templateUrl: './tela-config-inicial.component.html',
  styleUrls: ['./tela-config-inicial.component.scss']
})
export class TelaConfigInicialComponent implements OnInit {

  constructor() { }
  listaDemandas: Demanda[] | undefined 
  ngOnInit(): void {
    let local = localStorage.getItem('ordemExibicaoDemandasAtivada')
    let local2 = localStorage.getItem('ordemExibicaoDemandasDesativada')
    if(local){
      this.statusOrdemAtivada = JSON.parse(local)
    }

    if(local2){
      this.statusOrdemDesativada = JSON.parse(local2)
    }
  }
  statusOrdemAtivada: any = [];
  statusOrdemDesativada: any = [];
  padrao = [{"status":"SUAS_DEMANDAS","titulo":"Suas Demandas"},{"status":"BACKLOG_CLASSIFICACAO","titulo":"Backlog - Classificação"},{"status":"BACKLOG_PROPOSTA","titulo":"Backlog - Propostas"},{"status":"BUSINESS_CASE","titulo":"Business Case"},{"status":"ASSESSMENT","titulo":"Assessment"},{"status":"DISCUSSION","titulo":"Discussion"},{"status":"TO_DO","titulo":"To Do"},{"status":"DESIGN_AND_BUILD","titulo":"Design and Build"},{"status":"SUPPORT","titulo":"Support"},{"status":"CANCELLED","titulo":"Cancelled"},{"status":"DONE","titulo":"Done"}]

  salvarAlteracoes(){
    localStorage.setItem('ordemExibicaoDemandasAtivada', JSON.stringify(this.statusOrdemAtivada))
    localStorage.setItem('ordemExibicaoDemandasDesativada',  JSON.stringify(this.statusOrdemDesativada))
    alert('Alterações salvas com sucesso!')
  }

  redefinir(){
    localStorage.setItem('ordemExibicaoDemandasAtivada', JSON.stringify(this.padrao))
    this.statusOrdemAtivada = this.padrao
    this.statusOrdemDesativada = []
    localStorage.removeItem('ordemExibicaoDemandasDesativada')
    alert('Alterações redefinidas com sucesso!')
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
