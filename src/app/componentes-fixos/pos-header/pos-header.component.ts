import { filter } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-pos-header',
  templateUrl: './pos-header.component.html',
  styleUrls: ['./pos-header.component.scss']
})
export class PosHeaderComponent implements OnInit {

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.items = []
        if (e.url == '/tela-inicial/reunioes') {
          this.items.push({label: 'Reuniões'});
        } 
        else if (e.url == '/tela-inicial/demanda') {
          this.items.push({label: 'Criação'});
        }
        else if (e.url == '/tela-inicial') {
          this.items.push({label: 'Demandas'});
        }
        else  if (e.url.startsWith('/tela-inicial/chat')) {
          this.items.push({label: 'Chat'});
        }
        else if (e.url == '/tela-inicial/proposta') {
          this.items.push({label: 'Propostas'});
        }
        else if (e.url == '/tela-inicial/rascunhos') {
          this.items.push({label: 'Rascunhos'});
        }
        else if (e.url.startsWith('/tela-inicial/rascunho')) {
          this.items.push({label: 'Rascunho'});
        }
        else if (e.url == '/tela-inicial/configuracoes/layout') {
          this.items.push({label: 'Layout'});
        }
        else if (e.url == '/tela-inicial/configuracoes/perfil') {
          this.items.push({label: 'Perfil'});
        }
        else if (e.url == '/tela-inicial/configuracoes/ajuda') {
          this.items.push({label: 'Ajuda'});
        }
        else if (e.url == '/tela-inicial/configuracoes/sugestoes') {
          this.items.push({label: 'Sugestões'});
        }
        else if (e.url.includes('/tela-inicial/classificar-demanda')) {
          this.items.push({label: 'Classificar'});
        }
        else if (e.url == '/tela-inicial/historico-demanda') {
          this.items.push({label: 'Histórico'});
        }
        else if (e.url == '/tela-inicial/nova-pauta') {
          this.items.push({label: 'Nova Pauta'});
        }
        else if (e.url.includes('/tela-inicial/ver-reuniao') ) {
          this.items.push({label: 'Ver Reuniao'});
        }
        else if (e.url == '/tela-inicial/historico') {
          this.items.push({label: 'Histórico'});
        }
        else {
          this.items.push({label: 'Not Found'});
        }
      });
  }

  mostrar_modal = false;
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.activeItem = this.items[0];
  }
}
