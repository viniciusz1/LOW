import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { VoiceRecognitionService } from './services/voice-recognition.service';
import { FalarTextoDirective } from './directives/falar-texto.directive';
import { FalarTextoService } from './services/falar-textos.service';
import { MessageService } from 'primeng/api';
import { MessagesService } from './websocket/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'low';
  constructor(translate: TranslateService,
    private http: HttpClient,
    private messageService: MessageService,
    private messagesService: MessagesService,
    public voiceRecognitionService: VoiceRecognitionService,
    public falarTextoService: FalarTextoService) {


    this.messagesService.initializeWebSocketConnection();
    this.voiceRecognitionService.init()
    translate.setDefaultLang('pt');
    let htmlRoot: HTMLElement = <HTMLElement>document.getElementsByTagName('html')[0];
    let bodyroot: HTMLElement = <HTMLElement>document.getElementsByTagName('body')[0];
    let fontFamily = window.localStorage.getItem('fontFamily');
    if (fontFamily != null && bodyroot.style.fontFamily != fontFamily) {
      bodyroot.style.fontFamily = fontFamily;
      window.localStorage.setItem('fontFamily', fontFamily);
    }
    let fontSize = window.localStorage.getItem('fontSize');
    if (fontSize != null && fontSize != htmlRoot.style.fontSize) {
      htmlRoot.style.fontSize = fontSize + 'px';
      window.localStorage.setItem('fontSize', fontSize);
    }

  }
  ngOnInit(): void {
  }


  startedRecodAudio = false;
  pararDeFalar() {
    this.showError('Parando a tradução de texto para voz!')
    this.falarTextoService.cancel();
    this.falarTextoService.permitirFala = false;
  }

  iniciarFala() {
    this.showSuccess('Clique em um texto para ouvi-lo!')
    this.falarTextoService.permitirFala = true
  }

  startVoice() {
    this.showSuccess('Selecione um campo de Texto e certifique-se de que o microfone está ligado para começar a falar!')
    this.startedRecodAudio = true;
    this.voiceRecognitionService.start();
  }

  stopVoice() {
    this.showError('Parando a digitação por voz!')
    this.startedRecodAudio = false;
    this.voiceRecognitionService.stop()
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Funcionalidade Ativada!', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Funcionalidade Desativada!', detail: message });
  }
}
