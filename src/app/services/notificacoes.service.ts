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

  getNotificacoes(){
    return this.http.get<Notificacao[]>(path + 'notificacao')
  }

}
