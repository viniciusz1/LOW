import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tela-chat',
  templateUrl: './tela-chat.component.html',
  styleUrls: ['./tela-chat.component.scss']
})


export class TelaChatComponent implements OnInit {

  constructor() { }
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



  enviarMensagem(event: KeyboardEvent | Event) {
    if(this.mensagem.nativeElement.value == ""){
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
    }else{
      this.mensagens.push({
        mensagem: this.mensagem.nativeElement.value,
        rementente: "solicitante"
      })
      this.mensagem.nativeElement.value = ""
    }
  }
}
interface Mensagem{
  rementente: string,
  mensagem: string
}
