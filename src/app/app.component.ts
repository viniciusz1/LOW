import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { VoiceRecognitionService } from './services/voice-recognition.service';
import { FalarTextoDirective } from './directives/falar-texto.directive';
import { FalarTextoService } from './services/falar-textos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'low';
  constructor(translate: TranslateService,
    private http: HttpClient,
    public voiceRecognitionService: VoiceRecognitionService,
    public falarTextoService: FalarTextoService) {


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
  startVoice() {
    this.startedRecodAudio = true;
    this.voiceRecognitionService.start();
  }

  stopVoice() {
    this.startedRecodAudio = false;
    this.voiceRecognitionService.stop()
  }
}
