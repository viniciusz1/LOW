import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pos-header',
  templateUrl: './pos-header.component.html',
  styleUrls: ['./pos-header.component.scss']
})
export class PosHeaderComponent implements OnInit {

  constructor(private location: Location) {
    this.location.onUrlChange(e => {
      if (e == '/tela-inicial/data-comissao') {
        this.titulo = 'Reuniões';
      }
      else if (e == '/tela-inicial') {
        this.titulo = 'Demandas';
      }
      else if (e == '/tela-inicial/chat') {
        this.titulo = 'Chat'
      }
      else if (e == '/tela-inicial/proposta/1') {
        this.titulo = 'Criar Demanda'
      }
      else if (e == '/tela-inicial/rascunhos') {
        this.titulo = 'Rascunhos'
      }
      else if (e == '/tela-inicial/rascunhos') {
        this.titulo = 'Perfil'
      }
      else if (e == '/tela-inicial/layout') {
        this.titulo = 'Layout'
      }
      else if (e == '/tela-inicial/notificacoes') {
        this.titulo = 'Notificações'
      }
      else if (e == '/tela-inicial/ajuda') {
        this.titulo = 'Ajuda'
      }
      else if (e == '/tela-inicial/sugestoes') {
        this.titulo = 'Sugestões'
      }
      else if (e == '/tela-inicial/ver-pauta') {
        this.titulo = 'Pauta'
      }
      
    })
  }
  currentRoute = "";
  titulo = 'Demandas'
  ngOnInit(): void {

  }

}
