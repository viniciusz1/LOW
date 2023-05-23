import { Directive, ElementRef } from '@angular/core';
import { TextToSpeechService } from '../services/falar-textos.service';

@Directive({
  selector: '[appFalarTexto]'
})
export class FalarTextoDirective {

  constructor(private elementRef: ElementRef, private textToSpeechService: TextToSpeechService) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.addEventListener('click', this.onElementClick.bind(this));
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.removeEventListener('click', this.onElementClick.bind(this));
  }

  onElementClick(): void {
    const text = this.elementRef.nativeElement.innerText;
    this.textToSpeechService.speak(text);
  }
}
