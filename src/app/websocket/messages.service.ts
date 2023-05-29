import { Demanda } from 'src/app/models/demanda.model';
import { UsuarioService } from './../services/usuario.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Mensagem } from '../models/message.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  public $mensagesEmmiter: EventEmitter<Mensagem> = new EventEmitter();
  public $qtdMensagensNaoLida: EventEmitter<number> = new EventEmitter();
  public codigoRota: string | undefined;
  private client: Client | undefined;

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8085/low/ws/info';
    const ws = new SockJS(serverUrl);
    this.client = new Client({
      webSocketFactory: () => ws,
      debug: (msg: string) => console.log(msg),
    });
  }

  connect() {
    if (this.client?.active == false) {
      this.client.activate();
    } else {
      alert('Cliente indefinido');
    }
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
    } else {
      alert('Cliente indefinido');
    }
  }

  subscribeToNotifications() {
    let codigoUser = this.usuarioService.getCodigoUser();
    if (this.client) {
      const subscription = this.client.subscribe(
        '/noticicacoes-messages/' + codigoUser + '/chat',
        (message: Message) => {
          console.log('Recebeu notificação: ' + message);
        }
      );
    }
  }

  // connectWithRetry(maxRetries = 5, retryCount = 0) {
  //   this.stompClient.connect({}, (frame: any) => {
  //     this.inscreverNotificacoesMensagem();
  //     this.inscrever();
  //   }, (error: any) => {
  //     if (retryCount < maxRetries) {
  //       retryCount++;
  //       console.log('Erro de conexão. Tentando novamente...');
  //       setTimeout(() => {
  //         this.connectWithRetry(maxRetries, retryCount);
  //       }, 3000); // Espera 3 segundos antes de tentar novamente
  //     } else {
  //       console.log('Falha na conexão após várias tentativas. Verifique sua conexão de rede.');
  //     }
  //   });
  // }

  // inscreverNotificacoesMensagem() {
  //   let codigoUser = this.usuarioService.getCodigoUser()
  //   this.stompClient.subscribe('/noticicacoes-messages/' + codigoUser + '/chat', (message: any) => {
  //     this.updateQuantidadeMensagensNotificacoes();
  //   });
  // }

  subscribeChat(codigoRota?: string) {
    if (codigoRota) {
      this.codigoRota = codigoRota;
    }

    if (this.client) {
      const subscription = this.client.subscribe(
        '/demanda/' + this.codigoRota + '/chat',
        (message: Message) => {
          this.$mensagesEmmiter.emit(JSON.parse(message.body));
        }
      );
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
      .get<any>(
        'http://localhost:8085/low/mensagens/demandasDiscutidas/' +
          this.usuarioService.getCodigoUser()
      )
      .pipe(
        map((demandas: any) => {
          console.log(demandas);
          let qtdMensagensNaoLidas = 0;
          for (let demanda of demandas.demandas) {
            let infoExtras = demandas.infoCard.find(
              (e: { codigoDemanda: any }) =>
                e.codigoDemanda == demanda.codigoDemanda
            );
            demanda.horaUltimaMensagem = infoExtras.horaUltimaMensagem;
            demanda.qtdMensagensNaoLidas = infoExtras.qtdMensagensNaoLidas;
            qtdMensagensNaoLidas += demanda.qtdMensagensNaoLidas;
            demanda.usuarioAguardando = infoExtras.usuarioAguardando;
          }
          if (qtdMensagensNaoLidas > 0) {
            this.$qtdMensagensNaoLida.emit(qtdMensagensNaoLidas);
          }

          const mapaDemanda = new Map();
          demandas.demandas.forEach((demanda: Demanda) => {
            if (!mapaDemanda.has(demanda.codigoDemanda)) {
              mapaDemanda.set(demanda.codigoDemanda, demanda);
            } else {
              const demandaExistente = mapaDemanda.get(demanda.codigoDemanda);
              if (
                demanda.version &&
                demanda.version > demandaExistente.version
              ) {
                mapaDemanda.set(demanda.codigoDemanda, demanda);
              }
            }
          });
          return [...mapaDemanda.values()];
        })
      );
  }

  getMessages(codigoDemanda: string) {
    return this.http.get<Mensagem[]>(
      'http://localhost:8085/low/mensagens/' + codigoDemanda
    );
  }

  send(
    destino: string,
    mensagem: string,
    codigoDemanda: string,
    codigoUsuario: string
  ) {
    let file = new File([new Blob()], 'filename.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('file', file, 'filename.jpg');
    let mensagemDTO = {
      textoMensagens: mensagem,
      demandaMensagens: {
        codigoDemanda: codigoDemanda,
      },
      usuarioMensagens: {
        codigoUsuario: codigoUsuario,
      },
      multipartFile: formData,
    };

    if (this.client) {
      this.client.publish({
        destination: destino,
        body: JSON.stringify(mensagemDTO),
      });
    } else {
      // console.lo("Conexão não estabelecida!")
    }
  }
}
