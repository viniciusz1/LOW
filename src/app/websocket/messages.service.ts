import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Mensagem } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private http: HttpClient) {
    this.initializeWebSocketConnection();
  }
  public stompClient: any;
  public $mensagesEmmiter: EventEmitter<Mensagem[]> = new EventEmitter()
  public codigoRota: string | undefined



  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8085/low/ws/info';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame: any) => {
      this.inscrever()
    });
  }

  inscrever(){
    this.stompClient.subscribe('/demanda/' + this.codigoRota + '/chat', (message: any) => {
      if (message.body && this.codigoRota) {
        this.getMessages(this.codigoRota).subscribe(e => {
          this.$mensagesEmmiter.emit(e);
        })
      }
    });
  }

  getMessages(codigoDemanda: string) {
    return this.http.get<Mensagem[]>('http://localhost:8085/low/mensagens/' + codigoDemanda)
  }

  send(destino: string, mensagem: string, codigoDemanda: string, codigoUsuario: string) {
    let mensagemDTO = {
      textoMensagens: mensagem,
      demandaMensagens: {
        codigoDemanda: codigoDemanda
      },
      usuarioMensagens: {
        codigoUsuario: codigoUsuario
      }
    }

    if (this.stompClient) {
      this.stompClient.send(
        destino, {}, JSON.stringify(mensagemDTO)
      )
    } else {
      console.log("Conexão não estabelecida!")
    }
  }
}
