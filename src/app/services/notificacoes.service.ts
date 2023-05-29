import { path } from './path/rota-api';
import { Notificacao } from './../models/notificacao.model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';



@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {
  constructor(private http: HttpClient) {
    // this.initializeWebSocketConnection();
    // this.initializeWebSocketConnectionCount();
  }

  getNotificacoes(){
    return this.http.get<Notificacao[]>(path + 'notificacao')
  }

  public stompClient: any;
  public $notificationEmmiter: EventEmitter<Notificacao[]> = new EventEmitter()
  public $notificationCountEmmiter: EventEmitter<Number> = new EventEmitter()
  public codigoRota: string | undefined



  initializeWebSocketConnection() {
    // const serverUrl = 'http://localhost:8085/low/ws/info';
    // const ws = new SockJS(serverUrl);
    // this.stompClient = Stomp.over(ws);
    // this.stompClient.connect({}, (frame: any) => {
    //   this.inscrever()
    // });
  }



  initializeWebSocketConnectionCount() {
    // const serverUrl = 'http://localhost:8085/low/ws/info';
    // const ws = new SockJS(serverUrl);
    // this.stompClient = Stomp.over(ws);
    // this.stompClient.connect({}, (frame: any) => {
    //   this.inscreverCount()
    // });
  }

  inscrever(codigoRota?: string) {
      this.getNotifications().subscribe(e => {
        this.$notificationEmmiter.emit(e);
      })

    this.stompClient.subscribe('/usuario', (message: any) => {
      if (message.body) {
        this.getNotifications().subscribe(e => {
          this.$notificationEmmiter.emit(e);
        })
      }
    });
  }

  inscreverCount(codigoRota?: string) {
    this.getCountNotifications().subscribe(e => {
      this.$notificationCountEmmiter.emit(e);
    })

  this.stompClient.subscribe('/usuario', (message: any) => {
    if (message.body) {
      this.getCountNotifications().subscribe(e => {
        this.$notificationCountEmmiter.emit(e);
      })
    }
  });
}

getNotifications() {
  return this.http.get<Notificacao[]>(path + 'notificacao')

}
getCountNotifications() {
  return this.http.get<Number>(path + 'notificacao/quantidade')
}

send(destino: string) {
  if (this.stompClient) {
    this.stompClient.send(
      destino
    )
  } else {
    // console.lo("Conexão não estabelecida!")
  }
}

disconect() {
  if (this.stompClient) {
    this.stompClient.disconnect(() => {
      console.log('WebSocket desconectado');
    });
  }
}

}

