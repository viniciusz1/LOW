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
    return this.http.get<Notificacao[]>('http://localhost:8080/notificacao/' + codigoUsuario)
// Handler for events without an event type specified


  }
}
