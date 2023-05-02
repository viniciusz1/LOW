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

  inscrever(codigoRota?: string) {
    if (codigoRota) {
      this.codigoRota = codigoRota
    }
    
    if (this.codigoRota)
      this.getMessages(this.codigoRota).subscribe(e => {
        this.$mensagesEmmiter.emit(e);
      })

    this.stompClient.subscribe('/demanda/' + this.codigoRota + '/chat', (message: any) => {
      if (message.body && this.codigoRota) {
        this.getMessages(this.codigoRota).subscribe(e => {
          this.$mensagesEmmiter.emit(e);
        })
      }
    });
  }

  getDemandasRelacionadas(){
    return this.http.get<any>('http://localhost:8085/low/mensagens/demandasDiscutidas/' + 2)
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
