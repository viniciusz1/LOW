
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class RotasService {

  titulo = new EventEmitter<string>;



  constructor(private location: Location) {
    this.location.onUrlChange(e => {
      if (e == '/tela-inicial/reunioes') {
        this.titulo.emit('Reunioes');
      }
      if (e == '/tela-inicial') {
        this.titulo.emit('Demandas');
      }
      if (e == '/tela-inicial/chat') {
        this.titulo.emit('Chat');
      }
      if (e == '/tela-inicial/proposta') {
        this.titulo.emit('Propostas');
      }
      if (e == '/tela-inicial/rascunhos') {
        this.titulo.emit('Rascunhos');
      }
      if (e == '/tela-inicial/configuracoes/layout') {
        this.titulo.emit('Layout');
      }
      if (e == '/tela-inicial/configuracoes/perfil') {
        this.titulo.emit('Perfil');
      }
      if (e == '/tela-inicial/configuracoes/ajuda') {
        this.titulo.emit('Ajuda');
      }
      if (e == '/tela-inicial/configuracoes/sugestoes') {
        this.titulo.emit('Sugestões');
      }
      if (e == '/tela-inicial/classificar-demanda') {
        this.titulo.emit('Classificar Demanda');
      }
      if (e == '/tela-inicial/historico-demanda') {
        this.titulo.emit('Histórico');
      }
      if (e == '/tela-inicial/nova-pauta') {
        this.titulo.emit('Nova Pauta');
      }
      if (e == '/tela-inicial/ver-pauta') {
        this.titulo.emit('Ver Pauta');
      }
      if (e == '/tela-inicial/historico') {
        this.titulo.emit('Histórico');
      }
    })
  }          
}