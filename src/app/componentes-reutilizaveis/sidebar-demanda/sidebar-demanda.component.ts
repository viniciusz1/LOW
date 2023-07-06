import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Personalizacao } from 'src/app/models/personalizacao.model';
@Component({
  selector: 'app-sidebar-demanda',
  templateUrl: './sidebar-demanda.component.html',
  styleUrls: ['./sidebar-demanda.component.scss']
})
export class SidebarDemandaComponent implements OnInit {

  ngOnInit(): void {
    let personalizacao = localStorage.getItem('personalizacao');
    let persona: Personalizacao | undefined;
    if(personalizacao){
      persona = JSON.parse(personalizacao);
    }
    this.listCoresPrimarias = persona?.coresPrimariasPersonalizacao;
    console.log(this.listCoresPrimarias)
  }
  @Output() clicouNaSeta = new EventEmitter<string>();
  @Output() clicouEmUmStatus = new EventEmitter();
  listCoresPrimarias: any;
  onClick() {
    this.isCollapsed = !this.isCollapsed;
    this.clicouNaSeta.emit();
  }

  centered = false;
  disabled = false;
  unbounded = false;
  isCollapsed: boolean = false;
  radius: number = 0;
  color: string = 'black';
}
