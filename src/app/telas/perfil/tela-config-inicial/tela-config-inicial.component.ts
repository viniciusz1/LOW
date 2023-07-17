
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Demanda } from 'src/app/models/demanda.model';

@Component({
  selector: 'app-tela-config-inicial',
  templateUrl: './tela-config-inicial.component.html',
  styleUrls: ['./tela-config-inicial.component.scss']
})
export class TelaConfigInicialComponent implements OnInit {

  constructor(
    private messageService: MessageService,) { }
  listaDemandas: Demanda[] | undefined
  ngOnInit(): void {
    let local = localStorage.getItem('ordemExibicaoDemandasAtivada')
    let local2 = localStorage.getItem('ordemExibicaoDemandasDesativada')
    let local3 = localStorage.getItem('personalizacao')
    if (local) {
      this.statusOrdemAtivada = JSON.parse(local)
    }else{
      this.statusOrdemAtivada = [...this.padrao]
    }

    if (local2) {
      this.statusOrdemDesativada = JSON.parse(local2)
    }

    
    if(local3){
    let listaCores = JSON.parse(local3).coresPrimariasPersonalizacao;
    listaCores.unshift("#7000ff");

    // Troca das cores de Assessment e Business Case
    let ass = listaCores[5];
    listaCores[5] = listaCores[4];
    listaCores[4] = ass;

    this.padrao.forEach((item: any, index: any) => {
      item.cor = `0.5vw solid ${listaCores[index]}`;
    });
    }
  }
  statusOrdemAtivada: any = [];
  statusOrdemDesativada: any = [];
  padrao: any =[{"status":"FAVORITOS","titulo":"Favoritos", "cor": "#72bbf7"}, {"status":"SUAS_DEMANDAS","titulo":"Suas Demandas", "cor": "#72bbf7"},{"status":"BACKLOG_CLASSIFICACAO","titulo":"Backlog - Classificação", "cor": "#00579D"},{"status":"BACKLOG_APROVACAO","titulo":"Backlog - Aprovação", "cor": "#00579D"},{"status":"BACKLOG_PROPOSTA","titulo":"Backlog - Propostas", "cor": "#00579D"},{"status":"BUSINESS_CASE","titulo":"Business Case", "cor": "#FFDD43"},{"status":"ASSESSMENT","titulo":"Assessment", "cor": "#8862A2"},{"status":"DISCUSSION","titulo":"Discussion", "cor": "#b4b0a8"},{"status":"TO_DO","titulo":"To Do", "cor": "#EF8300"},{"status":"DESIGN_AND_BUILD","titulo":"Design and Build", "cor": "#000000"},{"status":"SUPPORT","titulo":"Support", "cor": "#0091BD"},{"status":"CANCELLED","titulo":"Cancelled", "cor": "#EA1010"},{"status":"DONE","titulo":"Done", "cor": "#82A584"}]


  salvarAlteracoes() {
    localStorage.setItem('ordemExibicaoDemandasAtivada', JSON.stringify(this.statusOrdemAtivada))
    localStorage.setItem('ordemExibicaoDemandasDesativada', JSON.stringify(this.statusOrdemDesativada))
    this.showSuccess('Alterações salvas com sucesso!')
  }
  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
  redefinir() {
    localStorage.removeItem('ordemExibicaoDemandasAtivada')
    this.statusOrdemAtivada =  [...this.padrao]
    this.statusOrdemDesativada = []
    localStorage.removeItem('ordemExibicaoDemandasDesativada')
    this.showSuccess('Alterações redefinidas com sucesso!')
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
