import { Demanda } from 'src/app/models/demanda.model';
import { UsuarioService } from './../services/usuario.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Client, Message, StompHeaders, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Mensagem } from '../models/message.model';
import { map, Subscription } from 'rxjs';
import { Conversa } from '../models/conversa.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  public $mensagesEmmiter: EventEmitter<Mensagem> = new EventEmitter();
  public $qtdMensagensNaoLida: EventEmitter<number> = new EventEmitter();
  public $mensagensVistas: EventEmitter<any> = new EventEmitter();
  public codigoRota: string | undefined;
  private _client: Client | undefined;
  private currentAttempt = 0;
  private reconnectAttempts = 10;
  get client() {
    return this._client;
  }

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8085/low/ws/info';
    const ws = new SockJS(serverUrl);
    this._client = new Client({
      webSocketFactory: () => ws,
      debug: (msg: string) => console.log(msg),
    });

    this._client.onStompError = (frame: any) => {
      console.error('Erro no STOMP:', frame);

      // Lógica para lidar com o erro de conexão STOMP e reconexão
      if (this.currentAttempt < this.reconnectAttempts) {
        this.currentAttempt++;
        console.log(
          `Tentando reconectar (tentativa ${this.currentAttempt})...`
        );
        setTimeout(() => {
          this.initializeWebSocketConnection(); // Tentar reconectar após o intervalo de tempo definido
        }, 3000);
      } else {
        console.log('Número máximo de tentativas de reconexão alcançado.');
      }
    };
  }

  activate() {
    if (this._client?.active == false) {
      this._client.activate();
    } else {
      alert('_cliente indefinido');
    }
  }

  disconnect() {
    if (this._client) {
      this._client.deactivate();
    } else {
      alert('_cliente indefinido');
    }
  }

  subscribeToNotificationsMensagens() {
    let codigoUser = this.usuarioService.getCodigoUser();

    try {
      if (this._client) {
        console.log(codigoUser)
          this.subscriptionNotificacaoMensagem = this._client.subscribe(
          '/notifica/' + codigoUser,
          (message: any) => {
            console.log("Recived")
            // this.updateQuantidadeMensagensNotificacoes();
          }
        );
      }

    } catch (err) {
      setTimeout(() => {
        this.subscribeToNotificationsMensagens();
      }, 3000)
    }
  }
  public subscriptionNotificacaoMensagem: StompSubscription | undefined;
  public subscriptionChat: StompSubscription | undefined;
  public subscriptionVisto: StompSubscription | undefined;

  subscribeChat(codigoRota?: string) {
    if (this.subscriptionChat != undefined) {
      this.subscriptionChat.unsubscribe();
    }
    if (codigoRota) {
      this.codigoRota = codigoRota;
    }
    try {
      if (this._client) {
        this.subscriptionChat = this._client.subscribe(
          '/demanda/' + this.codigoRota + '/chat',
          (message: Message) => {
            this.$mensagesEmmiter.emit(JSON.parse(message.body));
          },

        );
      }

    } catch (err) {
      setTimeout(() => {
        this.subscribeChat();
      }, 3000)

    }

  }

  subscribeVisto(codigoRota?: string) {
    if (this.subscriptionVisto != undefined) {
      this.subscriptionVisto.unsubscribe();
    }
    if (codigoRota) {
      this.codigoRota = codigoRota;
    }
    try {
      if (this._client) {
        this.subscriptionVisto = this._client.subscribe(
          '/visto/' + this.codigoRota + '/chat',
          (message: Message) => {
            this.$mensagensVistas.emit();
          },

        );
      }

    } catch (err) {
      setTimeout(() => {
        this.subscribeVisto();
      }, 3000)
    }
  }

  updateQuantidadeMensagensNotificacoes() {
    return this.http
      .get<any>(
        'http://localhost:8085/low/mensagens/qtd-total-n-lidas/' +
        this.usuarioService.getCodigoUser()
      )
      .subscribe({
        next: (e) => {
          console.log('QTD mensagens não lidas: ' + e);
          this.$qtdMensagensNaoLida.next(e);
        },
      });
  }

  getDemandasRelacionadas() {
    return this.http
      .get<Conversa[]>(
        'http://localhost:8085/low/mensagens/conversas/' +
        this.usuarioService.getCodigoUser()
      )
  }

  getMessages(codigoConversa: string) {
    return this.http.get<Mensagem[]>(
      'http://localhost:8085/low/mensagens/' + codigoConversa
    );
  }

  send(
    destino: string,
    mensagem: string,
    codigoConversa: string,
    codigoUsuario: string
  ) {
    let file = new File([new Blob()], 'filename.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('file', file, 'filename.jpg');
    let mensagemDTO = {
      textoMensagem: mensagem,
      conversaMensagem: {
        codigoConversa: codigoConversa,
      },
      usuarioMensagem: {
        codigoUsuario: codigoUsuario,
      },
      multipartFile: formData,
    };

    if (this._client && mensagemDTO.textoMensagem != undefined) {
      this._client.publish({
        destination: destino,
        body: JSON.stringify(mensagemDTO),
      });
    } else {
      // console.lo("Conexão não estabelecida!")
    }
  }
}
