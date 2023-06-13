import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfiguracoesIniciaisService } from 'src/app/services/configuracoes-iniciais.service';
import { FalarTextoService } from 'src/app/services/falar-textos.service';
import { VoiceRecognitionService } from 'src/app/services/voice-recognition.service';

@Component({
  selector: 'app-v-libras',
  templateUrl: './v-libras.component.html',
  styleUrls: ['./v-libras.component.scss']
})
export class VLibrasComponent implements OnInit {
  @ViewChild('vlibrasToggleButton')
  vlibrasToggleButton: ElementRef | undefined;
  vLibrasActive: boolean = false;

  constructor(private renderer: Renderer2, private route: ActivatedRoute,
    private messageService: MessageService,
    public voiceRecognitionService: VoiceRecognitionService,
    public falarTextoService: FalarTextoService,
    public configIniciais: ConfiguracoesIniciaisService) {
    // route.url.subscribe(() => {
    //   this.renderer.removeChild(document.body, this.vLibrasScript);
    // })
    this.initVLibras();
  }

  ngOnInit(): void {

  }

  vLibrasScript: any;

  private initVLibras() {

    const vLibrasScript = this.renderer.createElement('script');
    vLibrasScript.src = 'https://vlibras.gov.br/app/vlibras-plugin.js#5.2.0';
    setTimeout(() => {

      //@ts-ignore
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    }, 2000)
    this.renderer.appendChild(document.body, vLibrasScript);
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
