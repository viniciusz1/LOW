import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords: any;
  constructor() { }

  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'pt-BR';

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      if(this.inputEmFoco != null){
        //@ts-ignore

        this.inputEmFoco.value = this.tempWords
      }
      // console.log(transcript);
    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', (condition: any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    console.log("tempoWords: " + this.tempWords)
    this.text = this.text + ' ' + this.tempWords + '.';
    console.log("text: " + this.text)
    this.tempWords = '';
  }

  private inputEmFoco: HTMLElement | null =  null;

  setInputEmFoco(input: HTMLElement | null): void {
    this.text = ''
    this.inputEmFoco = input;
  }

  // getInputEmFoco(): Observable<HTMLElement | null> {
  //   return this.inputEmFocoSubject.asObservable();
  // }

  // getValorInputEmFoco(): HTMLElement | null {
  //   this.inputEmFocoSubject.value
  //   return this.inputEmFocoSubject.getValue();
  // }

}
