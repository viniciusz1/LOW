
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
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
    let local = localStorage.getItem('ordemExibicaoDemandas')
    if(local){
      let ordemExibicao = JSON.parse(local)
    }
  }
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
