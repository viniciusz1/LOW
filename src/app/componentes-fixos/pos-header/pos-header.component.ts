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
        }if (e.url == '/tela-inicial/demanda') {
          this.items.push({label: 'Criação'});
        }
        if (e.url == '/tela-inicial') {
          this.items.push({label: 'Demandas'});
        }
        if (e.url == '/tela-inicial/chat') {
          this.items.push({label: 'Chat'});
        }
        if (e.url == '/tela-inicial/proposta') {
          this.items.push({label: 'Propostas'});
        }
        if (e.url == '/tela-inicial/rascunhos') {
          this.items.push({label: 'Rascunhos'});
        }
        if (e.url == '/tela-inicial/configuracoes/layout') {
          this.items.push({label: 'Layout'});
        }
        if (e.url == '/tela-inicial/configuracoes/perfil') {
          this.items.push({label: 'Perfil'});
        }
        if (e.url == '/tela-inicial/configuracoes/ajuda') {
          this.items.push({label: 'Ajuda'});
        }
        if (e.url == '/tela-inicial/configuracoes/sugestoes') {
          this.items.push({label: 'Sugestões'});
        }
        if (e.url.includes('/tela-inicial/classificar-demanda')) {
          this.items.push({label: 'Classificar'});
        }
        if (e.url == '/tela-inicial/historico-demanda') {
          this.items.push({label: 'Histórico'});
        }
        if (e.url == '/tela-inicial/nova-pauta') {
          this.items.push({label: 'Nova Pauta'});
        }
        if (e.url.includes('/tela-inicial/ver-reuniao') ) {
          this.items.push({label: 'Ver Reuniao'});
        }
        if (e.url == '/tela-inicial/historico') {
          this.items.push({label: 'Histórico'});
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
