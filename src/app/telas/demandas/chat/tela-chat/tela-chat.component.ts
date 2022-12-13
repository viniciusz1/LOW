import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tela-chat',
  templateUrl: './tela-chat.component.html',
  styleUrls: ['./tela-chat.component.scss']
})


export class TelaChatComponent implements OnInit {
  messageService: any;
  items: MenuItem[] = [];
  
  constructor(private confirmationService: ConfirmationService) { }
  @ViewChild('mensagemDigitada') private mensagem: any;
  mensagens: Mensagem[] = [{
    mensagem: "Olá, tudo bem?",
    rementente: "analista"
  },
  {
    mensagem: "Sim. tudo bem",
    rementente: "solicitante"
  },
  ]

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-pencil',
        command: () => {
          this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        }
      },
      {
        icon: 'pi pi-refresh',
        command: () => {
          this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        }
      },
      {
        icon: 'pi pi-trash',
        command: () => {
          this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
      },
      {
        icon: 'pi pi-upload',
        routerLink: ['/fileupload']
      },
      {
        icon: 'pi pi-external-link',
        url: 'http://angular.io'

      }
    ];
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

  enviarMensagem(event: KeyboardEvent | Event) {
    if (this.mensagem.nativeElement.value == "") {
      return
    }

    if (event instanceof KeyboardEvent) {
      if (event.key === "Enter") {
        this.mensagens.push({
          mensagem: this.mensagem.nativeElement.value,
          rementente: "solicitante"
        })
        this.mensagem.nativeElement.value = "";
      }
    } else {
      this.mensagens.push({
        mensagem: this.mensagem.nativeElement.value,
        rementente: "solicitante"
      })
      this.mensagem.nativeElement.value = ""
    }
  }
}
interface Mensagem {
  rementente: string,
  mensagem: string
}
