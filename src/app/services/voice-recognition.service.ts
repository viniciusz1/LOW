import { Injectable, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
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
  //se o inputEmFoco for uma string, esse emmiter emite a palavra digitada
  //tela parte-demanda deve se inscrever nesse emmiter
  public $novasPalavrasFaladas = new EventEmitter<string>();
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
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';

    if(this.inputEmFoco != null){
      if(typeof this.inputEmFoco  == 'string'){
        this.$novasPalavrasFaladas.emit(this.text)
      }else{
        //@ts-ignore
        this.inputEmFoco.value = this.text
      }
    }
  }

  private inputEmFoco: HTMLElement | null | string =  null;


  //Se for do tipo string serve para emitir informações para o
  //editor de texto personalizado
  setInputEmFoco(input: HTMLElement | null | string): void {
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
