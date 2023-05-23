
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FalarTextoService {
  public permitirFala = false;
  speak(text: string): void {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    if(this.permitirFala){
      synth.speak(utterance);
    }
  }
}
