import { path } from './path/rota-api';
import { Notificacao } from './../models/notificacao.model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { MessageService } from 'primeng/api';



@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {
  constructor(private http: HttpClient, private messagesService: MessageService) {
    // this.initializeWebSocketConnection();
    // this.initializeWebSocketConnectionCount();
  }

  getNotificacoes() {
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

  inscrever() {
    this.getCountNotifications().subscribe(e => {
      this.$notificationCountEmmiter.emit(e);
    })
    // this.setNotificacoes();
    // if (this.messagesService.client) {
    //   try {
    //     this.messagesService.client.subscribe('/usuario', (message: any) => {
    //       if (message.body) {
    //         this.getCountNotifications().subscribe(e => {
    //           this.$notificationCountEmmiter.emit(e);
    //         })
    //         // this.setNotificacoes()
    //       }
    //     });
    //   } catch (err) {
    //     setTimeout(() => {
    //       this.inscrever();
    //     }, 3000)
    //   }
    // }
  }

  inscreverCount(codigoRota?: string) {
    this.getCountNotifications().subscribe(e => {
      this.$notificationCountEmmiter.emit(e);
    })
  }

  getNotifications() {
    return this.http.get<Notificacao[]>(path + 'notificacao')

  }
  getCountNotifications() {
    return this.http.get<number>(path + 'notificacao/quantidade')
  }

  // send(destino: string) {
  //   if (this.messagesService.client) {
  //     this.messagesService.client.publish(
  //       { destination: destino }
  //     )
  //   } else {
  //     // console.lo("Conexão não estabelecida!")
  //   }
  // }


  disconect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('WebSocket desconectado');
      });
    }
  }

}

