import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Personalizacao } from 'src/app/models/personalizacao.model';

@Component({
  selector: 'app-sidebar-reuniao',
  templateUrl: './sidebar-reuniao.component.html',
  styleUrls: ['./sidebar-reuniao.component.scss']
})
export class SidebarReuniaoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let personalizacao = localStorage.getItem('personalizacao');
    let persona: Personalizacao | undefined;
    if(personalizacao){
      persona = JSON.parse(personalizacao);
    }
    this.listCoresPrimarias = persona?.coresPrimariasReuniaoPersonalizacao;
    console.log(this.listCoresPrimarias)
  }
  isCollapsed: boolean = false;
  @Output() clicouNaSeta = new EventEmitter();
  @Output() clicouEmUmStatus = new EventEmitter();
  listCoresPrimarias: any;

  onClick() {
    this.isCollapsed = !this.isCollapsed;
    this.clicouNaSeta.emit();
  }

}
