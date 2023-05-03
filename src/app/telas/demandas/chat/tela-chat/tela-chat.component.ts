;
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WebSocketConnector } from 'src/app/websocket/websocket-connector';
import { MessagesService } from 'src/app/websocket/messages.service';
import { Demanda } from 'src/app/models/demanda.model';
import { Mensagem } from 'src/app/models/message.model';
import { ScrollPanel } from 'primeng/scrollpanel';

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
  demandaDiscutida: Demanda | undefined

  constructor(private confirmationService: ConfirmationService, private route: ActivatedRoute, private usuarioService: UsuarioService, private messagesService: MessagesService) {
    if (this.codigoRota != "") {
      this.iniciarWebSocketChat()
    }
    this.setarConversas()
  }


  @ViewChild('scrollPanel') scrollPanel: ScrollPanel | undefined;

  scrollToBottom() {
    if(this.scrollPanel){
      this.scrollPanel.scrollTop(99999)

    }
  }

  verificarMensagemMaisAtual(){
    const mensagemMaisAtual = this.mensagens.reduce((mensagemMaisRecente: Mensagem | undefined, mensagemAtual: Mensagem) => {
      if (!mensagemMaisRecente) {
        return mensagemAtual;
      }
      if(mensagemAtual.dataMensagens && mensagemMaisRecente.dataMensagens){
        return mensagemAtual.dataMensagens > mensagemMaisRecente.dataMensagens ? mensagemAtual : mensagemMaisRecente;
      }
      return 
    }, undefined);
    
    console.log('A mensagem mais atual é:', mensagemMaisAtual);
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
      this.scrollToBottom()
    })
  }

  @ViewChild('mensagemDigitada') private mensagem: any;

  setarConversas() {
    this.messagesService.getDemandasRelacionadas()
      .subscribe(e => {
        console.log(e)
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
      this.demandaDiscutida = this.conversasDemandas.find(e => e.codigoDemanda == this.codigoRota)
      console.log("demandaDiscutida", this.demandaDiscutida)
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
