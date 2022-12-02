import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tela-chat',
  templateUrl: './tela-chat.component.html',
  styleUrls: ['./tela-chat.component.scss']
})


export class TelaChatComponent implements OnInit {

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
  }

  silenciarChat() {
    this.confirmationService.confirm({
        message: 'Deseja realmente silenciar esta conversa?',
        accept: () => {
            //Actual logic to perform a confirmation
        }
    })};

  enviarMensagem(){

    this.mensagens.push({
      mensagem: this.mensagem.nativeElement.value,
      rementente: "solicitante"
    })
    console.log(this.mensagens)
    this.mensagem.nativeElement.value = ""
  }
}
interface Mensagem{
  rementente: string,
  mensagem: string
}
