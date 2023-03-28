import { path } from './path/rota-api';
import { Notificacao } from './../models/notificacao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {
  constructor(private http: HttpClient){
  }

  getNotificacoes(codigoUsuario: number){
    return this.http.get<Notificacao[]>(path + 'notificacao/' + codigoUsuario)
// Handler for events without an event type specified


  }
}
