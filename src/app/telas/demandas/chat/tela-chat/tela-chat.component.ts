;
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WebSocketConnector } from 'src/app/websocket/websocket-connector';
import { MessagesService } from 'src/app/websocket/messages.service';
import { Demanda } from 'src/app/models/demanda.model';
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
  conversasDemandas: Demanda[] = []
  mostrarConversas = false;

  constructor(private confirmationService: ConfirmationService, private route: ActivatedRoute, private usuarioService: UsuarioService, private messagesService: MessagesService) {
    if (this.codigoRota != "") {
      this.iniciarWebSocketChat()
    }
    this.setarConversas()
  }


  iniciarWebSocketChat() {
    this.messagesService.initializeWebSocketConnection()
    this.messagesService.$mensagesEmmiter.subscribe(mensagens => {
      this.mensagens = []
      for (let i of mensagens) {
        if ((i.usuarioMensagens) && i.usuarioMensagens.codigoUsuario == this.usuarioService.getCodigoUser()) {
          i.ladoMensagem = true
        } else {
          i.ladoMensagem = false
        }
      }
      this.mostrarConversas = true
      this.mensagens.push(...mensagens)
    })
  }

  @ViewChild('mensagemDigitada') private mensagem: any;

  setarConversas() {
    this.messagesService.getDemandasRelacionadas()
      .subscribe(e => {
        e.filter
        this.conversasDemandas = e
      }
      )
  }

  enviarMensagemPorTeclado(event: KeyboardEvent){
    if (event.key === "Enter") {
      this.enviarMensagem()
    }
  }

  enviarMensagem() {
      this.messagesService?.send("/low/demanda/" + this.codigoRota, this.mensagem.nativeElement.value, this.codigoRota, this.usuarioService.getCodigoUser().toString())
      this.mensagem.nativeElement.value = ""
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(e => {
      this.codigoRota = e['codigoDemanda']
      this.messagesService.codigoRota = this.codigoRota
      this.iniciarWebSocketChat()
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
