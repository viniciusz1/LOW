
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MessagesService } from 'src/app/websocket/messages.service';
import { Demanda } from 'src/app/models/demanda.model';
import { Mensagem } from 'src/app/models/message.model';
import { ScrollPanel } from 'primeng/scrollpanel';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';
import { MatDialog } from '@angular/material/dialog';
import { MenuModule } from 'ngx-editor/lib/modules/menu/menu.module';
import { Conversa } from 'src/app/models/conversa.model';

@Component({
  selector: 'app-tela-chat',
  templateUrl: './tela-chat.component.html',
  styleUrls: ['./tela-chat.component.scss'],
})
export class TelaChatComponent implements OnInit, OnDestroy {
  messageService: any;
  items: MenuItem[] = [];
  codigoRota = '';
  mensagens: Mensagem[] = [];
  conversasDemandas: Conversa[] = [];
  mostrarConversas = false;
  demandaDiscutida: Demanda | undefined;
  pesquisaFiltro = '';

  constructor(
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    public usuarioService: UsuarioService,
    private messagesService: MessagesService,
    private matDialog: MatDialog
  ) {
    console.log('Rodou construtor   ');

    this.setarConversas();
    //Atualiza o código da rota e se increve e seta mensagens quando troca de rota
    this.route.params.subscribe((e) => {
      this.codigoRota = e['codigoDemanda'];
      this.messagesService.codigoRota = this.codigoRota;
      if (this.codigoRota != '' && this.codigoRota != undefined) {
        this.setMensagens();
        this.iniciarSubscribeChat();
      }
    });
  }

  setMensagens() {
    this.messagesService
      .getMessages(this.codigoRota)
      .subscribe((novasMensagens) => {
        this.mensagens = this.trocarLadoDaMensagem(novasMensagens);
        console.log(this.mensagens)
        this.mostrarConversas = true;
      });
    this.scrollToBottom();
  }

  alterarConversa(conversa: Conversa){
    this.demandaDiscutida = conversa.demandaConversa;
    this.router.navigate(['/tela-inicial/chat/' + conversa.codigoConversa])
  }

  iniciarSubscribeChat() {
    this.messagesService.subscribeVisto();
    this.messagesService.subscribeChat();
  }

  //Desinscreve do chat quando sai da tela
  ngOnDestroy(): void {
    if (this.messagesService.subscriptionChat != undefined) {
      this.messagesService.subscriptionChat.unsubscribe();
    }


    if (this.messagesService.subscriptionVisto != undefined) {
      this.messagesService.subscriptionVisto.unsubscribe();
    }
  }

  @ViewChild('scrollPanel') scrollPanel: ScrollPanel | undefined;

  scrollToBottom() {
    if (this.scrollPanel) {
      this.scrollPanel.scrollTop(99999);
    }
  }
  exibirQtdMensagensNaoLidas(conversa: any) {
    if (
      conversa?.qtdMensagensNaoLidas != 0 &&
      conversa?.usuarioAguardando.codigoUsuario !=
        this.usuarioService.getCodigoUser()
    ) {
      return true;
    }
    return false;
  }


  verificarMensagemMaisAtual() {
    const mensagemMaisAtual = this.mensagens.reduce(
      (mensagemMaisRecente: Mensagem | undefined, mensagemAtual: Mensagem) => {
        if (!mensagemMaisRecente) {
          return mensagemAtual;
        }
        if (mensagemAtual.dataMensagem && mensagemMaisRecente.dataMensagem) {
          return mensagemAtual.dataMensagem > mensagemMaisRecente.dataMensagem
            ? mensagemAtual
            : mensagemMaisRecente;
        }
        return;
      },
      undefined
    );
  }

  //Quando recebe uma nova mensagem, da um publish para realizar o visto
  subscribeEmmiterMensagens() {
    this.messagesService.$mensagesEmmiter.subscribe((mensagem) => {
      if (mensagem.usuarioMensagem?.codigoUsuario != this.usuarioService.getCodigoUser()) {
        this.messagesService.client?.publish({
          destination: '/low/visto/' + this.codigoRota, body: JSON.stringify({ textoMensagem: "agora vai" })
        })
      }

      console.log("MENSAGEM: " + mensagem.textoMensagem)
      if(mensagem.textoMensagem != undefined){
        let novaMensagem = this.trocarLadoDaMensagem([mensagem]);
        this.mostrarConversas = true;
        this.mensagens.push(...novaMensagem);
        console.log("emitiu")
        setTimeout(() => {
          this.scrollToBottom();
        }, 200);
      }
    });
  }

  //Verifica o dono da mensagem
  trocarLadoDaMensagem(mensagens: Mensagem[]) {
    for (let mensagem of mensagens) {
      if (
        mensagem.usuarioMensagem &&
        mensagem.usuarioMensagem.codigoUsuario ==
          this.usuarioService.getCodigoUser()
      ) {
        mensagem.ladoMensagem = true;
      } else {
        mensagem.ladoMensagem = false;
      }
    }
    return mensagens;
  }

  @ViewChild('mensagemDigitada') private mensagem: any;

  //Seta as conversas que o usuário está participando
  setarConversas() {
    this.messagesService.getDemandasRelacionadas().subscribe((e) => {
      console.log(e)
      this.conversasDemandas = e;
      this.scrollToBottom();
    });
  }

  enviarMensagemPorTeclado(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.enviarMensagem();
    }
  }


  enviarMensagem() {
    if (this.mensagem.nativeElement.value != '') {
      this.messagesService?.send(
        '/low/demanda/' + this.codigoRota,
        this.mensagem.nativeElement.value,
        this.codigoRota,
        this.usuarioService.getCodigoUser().toString()
      );
      this.mensagem.nativeElement.value = '';
    }
  }
  // commnet
  openModalDemandaDocumento() {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: this.demandaDiscutida,
    });
  }

  ngOnInit(): void {
    this.subscribeEmmiterMensagens();
    this.messagesService.$mensagensVistas.subscribe(() => {
      this.mensagens.forEach((mensagem) => {
        mensagem.statusMensagem = "VISTA"
        })
    })
  }

  silenciarChat() {
    this.confirmationService.confirm({
      message: 'Deseja realmente silenciar esta conversa?',
      dismissableMask: true,
      header: 'Silenciar Chat',
      accept: () => {
        //Actual logic to perform a confirmation
      },
    });
  }

  finalizarChat() {
    this.confirmationService.confirm({
      message: 'Deseja finalizar esta conversa?',
      dismissableMask: true,
      header: 'Finalizar Chat',
      accept: () => {
        //Actual logic to perform a confirmation
      },
    });
  }
}
