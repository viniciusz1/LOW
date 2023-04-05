import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escopo-principal',
  templateUrl: './escopo-principal.component.html',
  styleUrls: ['./escopo-principal.component.scss']
})

/*
  Escopo utilizado em quase todo o sistema. Nele é chamado a o header, pós-header e também tem a tag
  <router-outlet><\router-outlet>, ela serve para caso uma rota começe com /tela-inicial/? o componente 
  destinado para aparecer nesta rota fique dentro desta tag
*/

export class EscopoPrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
