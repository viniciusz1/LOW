import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { VoiceRecognitionService } from './services/voice-recognition.service';
import { FalarTextoDirective } from './directives/falar-texto.directive';
import { FalarTextoService } from './services/falar-textos.service';
import { MessageService } from 'primeng/api';
import { MessagesService } from './websocket/messages.service';
import { ConfiguracoesIniciaisService } from './services/configuracoes-iniciais.service';
import { PersonalizacaoService } from './services/personalizacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lira';
  constructor(translate: TranslateService,
    private http: HttpClient,
    private messageService: MessageService,
    private messagesService: MessagesService,
    public voiceRecognitionService: VoiceRecognitionService,
    public falarTextoService: FalarTextoService,
    public configIniciais: ConfiguracoesIniciaisService,
    public personalizacaoService: PersonalizacaoService) {

    this.messagesService.initializeWebSocketConnection();
    this.messagesService.activate();
    this.voiceRecognitionService.init()
    translate.setDefaultLang('pt');
    this.configIniciais.setFontSize(undefined)
    this.configIniciais.setFontTheme(undefined)
    this.messagesService.subscribeToNotificationsMensagens()
    this.personalizacaoService.getPersonalizacaoAtiva().subscribe((personalizacao) => {
      localStorage.setItem('personalizacao', JSON.stringify(personalizacao))
      this.personalizacaoService.personalizacaoAtiva = personalizacao
    })
  }

  @ViewChild('vlibras') vlibras: any;

  ngOnInit(): void {
  }

  checked: boolean = true;

  checkedChanged() {
    this.checked = this.personalizacaoService.checked;
    return this.checked;
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
    console.log("Log foi " + this.checked);
    
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
