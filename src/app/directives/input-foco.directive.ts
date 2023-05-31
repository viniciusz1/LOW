import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';
import { VoiceRecognitionService } from '../services/voice-recognition.service';

@Directive({
  selector: '[inputEmFoco]'
})
export class InputFocoDirective {

  constructor(private voiceRecognition: VoiceRecognitionService) { }

  @HostBinding('class.emFoco') emFoco: boolean = false;
  @HostBinding('attr.data-input-em-foco') inputEmFoco: HTMLInputElement | undefined;

  @HostListener('onFocus', ['$event.target'])
  @HostListener('focus', ['$event.target'])
  onFocus(target: HTMLElement) {
    this.emFoco = true;
    this.inputEmFoco = target as HTMLInputElement;
    this.voiceRecognition.setInputEmFoco(this.inputEmFoco)
    // console.log('Input NOVO em foco');
  }




  @HostListener('focusIn', ['$event'])
  onFocusIn(target: any) {
    console.log(target)
    // console.log(target);
    // Lógica adicional a ser executada quando o evento for disparado
  }
  @HostListener('onBlur')
  @HostListener('blur')
  onBlur() {
    this.emFoco = false;
    this.inputEmFoco = undefined;
    this.voiceRecognition.setInputEmFoco(null)
    // console.log('Input sem foco');
  }

}
