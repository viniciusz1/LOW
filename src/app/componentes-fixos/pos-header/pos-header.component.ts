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
      if (e == '/tela-inicial') {
        this.titulo = 'Demandas';
      }
      if (e == '/tela-inicial/chat') {
        this.titulo = 'Chat'
      }
      if (e == '/tela-inicial/proposta/1') {
        this.titulo = 'Criar Demanda'
      }
      if (e == '/tela-inicial/rascunhos') {
        this.titulo = 'Rascunhos'
      }
      if (e == '/tela-inicial/rascunhos') {
        this.titulo = 'Perfil'
      }
      if (e == '/tela-inicial/layout') {
        this.titulo = 'Layout'
      }
      if (e == '/tela-inicial/notificacoes') {
        this.titulo = 'Notificações'
      }
      if (e == '/tela-inicial/ajuda') {
        this.titulo = 'Ajuda'
      }
      if (e == '/tela-inicial/sugestoes') {
        this.titulo = 'Sugestões'
      }
      if (e == '/tela-inicial/sugestoes') {
        this.titulo = 'Rascunhos'
      }
    })
  }
  currentRoute = "";
  titulo = 'Demandas'
  ngOnInit(): void {

  }

}
