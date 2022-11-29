
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { Location } from '@angular/common';


@Injectable({
    providedIn: 'root'
  })

  export class RotasService {

    titulo = new EventEmitter <string>;



    constructor(private location: Location) {
      this.location.onUrlChange(e => {
        if (e == '/tela-inicial/data-comissao') {
          this.titulo.emit('Reunioes');
        }
        if (e == '/tela-inicial') {
            this.titulo.emit('Demandas');
        }
        if (e == '/tela-inicial/chat') {
          this.titulo.emit('Chat');
        }
        if (e == '/tela-inicial/proposta/1') {
            this.titulo.emit('Propostas');
        }
        if (e == '/tela-inicial/rascunhos') {
            this.titulo.emit('Rascunhos');
        }
        if (e == '/tela-inicial/layout') {
            this.titulo.emit('Layout');
        }
        if (e == '/tela-inicial/notificacoes') {
            this.titulo.emit('Notificações');
        }
        if (e == '/tela-inicial/ajuda') {
            this.titulo.emit('Ajuda');
        }
        if (e == '/tela-inicial/sugestoes') {
            this.titulo.emit('Sugestões');
        }
      })
     }
  }