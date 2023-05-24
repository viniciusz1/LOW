
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FalarTextoService {
  private synth: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance;
  constructor() {
    this.synth = window.speechSynthesis;
    this.utterance = new SpeechSynthesisUtterance();
  }


  public permitirFala = false;
  speak(text: string): void {
    if (this.permitirFala) {
      this.utterance.text = text;
      this.synth.speak(this.utterance);
    }
  }
  cancel(){
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }
}
