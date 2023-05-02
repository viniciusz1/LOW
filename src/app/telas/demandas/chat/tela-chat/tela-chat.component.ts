import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WebSocketConnector } from 'src/app/websocket/websocket-connector';
import { MessagesService } from 'src/app/websocket/messages.service';
import { Message } from '@stomp/stompjs';
import { Demanda } from 'src/app/models/demanda.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Mensagem } from 'src/app/models/message.model';

@Component({
  selector: 'app-tela-chat',
  templateUrl: './tela-chat.component.html',
  styleUrls: ['./tela-chat.component.scss']
})

export class TelaChatComponent implements OnInit {
  messageService: any;
  items: MenuItem[] = [];
  codigoRota = ""
  mensagens: Mensagem[] = []

  constructor(private confirmationService: ConfirmationService, private route: ActivatedRoute, private usuarioService: UsuarioService, private messagesService: MessagesService) {
    if (this.codigoRota != "") {
      this.messagesService.initializeWebSocketConnection()
      messagesService.$mensagesEmmiter.subscribe(mensagens => {
        this.mensagens = []
        let usuarioLogado = localStorage.getItem('user')
        for (let i of mensagens) {
          if ((usuarioLogado && i.usuarioMensagens) && i.usuarioMensagens.codigoUsuario == JSON.parse(usuarioLogado).codigoUsuario) {
            i.ladoMensagem = true
          } else {
            i.ladoMensagem = false
          }
        }

        this.mensagens.push(...mensagens)
      })  
    }

  }
  @ViewChild('mensagemDigitada') private mensagem: any;



  enviarMensagem(event: KeyboardEvent | Event) {
    if (this.mensagem.nativeElement.value == "") {
      return
    }

    if (event instanceof KeyboardEvent) {
      if (event.key === "Enter") {
        this.mensagens.push({
          textoMensagens: this.mensagem.nativeElement.value,
          ladoMensagem: false
        })
        this.messagesService?.send("/low/demanda/" + this.codigoRota, this.mensagem.nativeElement.value, this.codigoRota, this.usuarioService.getCodigoUser().toString())
        this.mensagem.nativeElement.value = "";
      }
    } else {
      this.mensagens.push({
        textoMensagens: this.mensagem.nativeElement.value,
        ladoMensagem: false
      })
      this.messagesService?.send("/low/demanda/" + this.codigoRota, this.mensagem.nativeElement.value, this.codigoRota, this.usuarioService.getCodigoUser().toString())
      this.mensagem.nativeElement.value = ""
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(e => {
      this.codigoRota = e['codigoDemanda']
      this.messagesService.codigoRota = this.codigoRota
    })

  }

  silenciarChat() {
    this.confirmationService.confirm({
      message: 'Deseja realmente silenciar esta conversa?',
      dismissableMask: true,
      header: 'Silenciar Chat',
      accept: () => {
        //Actual logic to perform a confirmation
      }
    })
  };

  finalizarChat() {
    this.confirmationService.confirm({
      message: 'Deseja finalizar esta conversa?',
      dismissableMask: true,
      header: 'Finalizar Chat',
      accept: () => {
        //Actual logic to perform a confirmation
      }
    })
  };


}
