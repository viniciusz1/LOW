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
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';
import { MatDialog } from '@angular/material/dialog';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

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

  constructor(private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private messagesService: MessagesService,
    private matDialog: MatDialog) {
    this.setarConversas()
    this.messagesService.initializeWebSocketConnection()
  }


  @ViewChild('scrollPanel') scrollPanel: ScrollPanel | undefined;

  scrollToBottom() {
    if (this.scrollPanel) {
      this.scrollPanel.scrollTop(99999)

    }
  }
  exibirQtdMensagensNaoLidas(conversa: any){
    if(conversa?.qtdMensagensNaoLidas != 0 && conversa?.usuarioAguardando.codigoUsuario != this.usuarioService.getCodigoUser()){
      return true
    }
    return false;
  }

  verificarMensagemMaisAtual() {
    const mensagemMaisAtual = this.mensagens.reduce((mensagemMaisRecente: Mensagem | undefined, mensagemAtual: Mensagem) => {
      if (!mensagemMaisRecente) {
        return mensagemAtual;
      }
      if (mensagemAtual.dataMensagens && mensagemMaisRecente.dataMensagens) {
        return mensagemAtual.dataMensagens > mensagemMaisRecente.dataMensagens ? mensagemAtual : mensagemMaisRecente;
      }
      return
    }, undefined);
  }
  pesquisaFiltro = ''
  iniciarWebSocketChat() {
    this.messagesService.initializeWebSocketConnection()
    this.messagesService.$mensagesEmmiter.subscribe(mensagens => {
      this.setarConversas()
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
        this.conversasDemandas = e
        this.demandaDiscutida = this.conversasDemandas.find(e => e.codigoDemanda == this.codigoRota)
        this.scrollToBottom()
      })
  }

  enviarMensagemPorTeclado(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.enviarMensagem()
    }
  }

  enviarMensagem() {
    if (this.mensagem.nativeElement.value != "") {
      this.messagesService?.send("/low/demanda/" + this.codigoRota, this.mensagem.nativeElement.value, this.codigoRota, this.usuarioService.getCodigoUser().toString())
      this.mensagem.nativeElement.value = ""
    }

  }

  openModalDemandaDocumento() {
    this.matDialog
      .open(ModalDemandaDocumentoComponent, {
        maxWidth: '70vw',
        minWidth: '50vw',
        data: this.demandaDiscutida,
      })
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
