import { path } from './path/rota-api';
import { Notificacao } from './../models/notificacao.model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { MessagesService } from '../websocket/messages.service';



@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {
  constructor(private http: HttpClient, private messagesService: MessagesService) {
    // this.initializeWebSocketConnection();
    // this.initializeWebSocketConnectionCount();
  }

  getNotificacoes() {
    return this.http.get<Notificacao[]>(path + 'notificacao')
  }

  public $notificationEmmiter: EventEmitter<Notificacao[]> = new EventEmitter()
  public $notificationCountEmmiter: EventEmitter<number> = new EventEmitter()
  public codigoRota: string | undefined





  inscrever(codigoRota?: string) {
    // this.getCountNotifications().subscribe(e => {
    //   console.log("COUNT: "+e)
    //   this.$notificationCountEmmiter.emit(e);
    // })
    // this.setNotificacoes();
    if (this.messagesService.client) {
      try {
        this.messagesService.client.subscribe('/usuario', (message: any) => {
          if (message.body) {
            console.log(message.body)
            // this.setNotificacoes()
          }
        });
      } catch (err) {
        setTimeout(() => {
          this.inscrever();
        }, 3000)
      }
    }
  }

  setNotificacoes() {
    this.getNotifications().subscribe(e => {
      this.$notificationEmmiter.emit(e);
    })
    this.getCountNotifications().subscribe(e => {
      console.log("COUNT: "+e)
      this.$notificationCountEmmiter.emit(e);
    })
  }

  // inscreverCount(codigoRota?: string) {
  //   this.getCountNotifications().subscribe(e => {
  //     this.$notificationCountEmmiter.emit(e);
  //   })

  //   if (this.messagesService.client) {
  //     try {
  //       this.messagesService.client.subscribe('/usuario', (message: any) => {
  //         if (message.body) {
  //           this.getCountNotifications().subscribe(e => {
  //             this.$notificationCountEmmiter.emit(e);
  //           })
  //         }
  //       });
  //     } catch (err) {
  //       setTimeout(() => {
  //         this.inscreverCount();
  //       }, 3000)
  //     }
  //   }
  // }

  getNotifications() {
    return this.http.get<Notificacao[]>(path + 'notificacao')

  }
  getCountNotifications() {
    return this.http.get<number>(path + 'notificacao/quantidade')
  }

  send(destino: string) {
    if (this.messagesService.client) {
      this.messagesService.client.publish(
        { destination: destino }
      )
    } else {
      // console.lo("Conexão não estabelecida!")
    }
  }



}

