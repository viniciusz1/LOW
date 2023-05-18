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
    this.initializeWebSocketConnection();
  }

  getNotificacoes(){
    return this.http.get<Notificacao[]>(path + 'notificacao')
  }

  public stompClient: any;
  public $notificationEmmiter: EventEmitter<Notificacao[]> = new EventEmitter()
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
      this.getMessages().subscribe(e => {
        this.$notificationEmmiter.emit(e);
      })

    this.stompClient.subscribe('/usuario', (message: any) => {
      if (message.body) {
        this.getMessages().subscribe(e => {
          this.$notificationEmmiter.emit(e);
        })
      }
    });
  }

//   getDemandasRelacionadas() {
//     return this.http.get<any>('http://localhost:8085/low/mensagens/demandasDiscutidas/' + this.usuarioService.getCodigoUser())
//     .pipe(map((demandas: any) => {
//       //console.log(demandas)
//       console.log(demandas)
//       for(let demanda of demandas.demandas){
//         let infoExtras = demandas.infoCard.find((e: { codigoDemanda: any; }) => e.codigoDemanda == demanda.codigoDemanda)
//         demanda.horaUltimaMensagem = infoExtras.horaUltimaMensagem
//         demanda.qtdMensagensNaoLidas = infoExtras.qtdMensagensNaoLidas
//         demanda.usuarioAguardando = infoExtras.usuarioAguardando
//       }

//       const mapaDemanda = new Map();
//       demandas.demandas.forEach((demanda: Demanda) => {
//         if (!mapaDemanda.has(demanda.codigoDemanda)) {
//           mapaDemanda.set(demanda.codigoDemanda, demanda);
//         } else {
//           const demandaExistente = mapaDemanda.get(demanda.codigoDemanda);
//           if ((demanda.version) && demanda.version > demandaExistente.version) {
//             mapaDemanda.set(demanda.codigoDemanda, demanda);
//           }
//         }
//       });
//       return [...mapaDemanda.values()];
//     }))
//   }


getMessages() {
  return this.http.get<Notificacao[]>('http://localhost:8085/low/notificacao')

}

send(destino: string) {
//   let file = new File([new Blob()], 'filename.jpg', { type: 'image/jpeg' })
//   const formData = new FormData();
//   formData.append('file', file, 'filename.jpg');
//   let mensagemDTO = {
//     textoMensagens: mensagem,
//     demandaMensagens: {
//       codigoDemanda: codigoDemanda
//     },
//     usuarioMensagens: {
//       codigoUsuario: codigoUsuario
//     },
//     multipartFile: formData
//   }

  if (this.stompClient) {
    this.stompClient.send(
      destino
    )
  } else {
    // console.lo("Conexão não estabelecida!")
  }
}
}

