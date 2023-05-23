import { Directive, ElementRef } from '@angular/core';
import { FalarTextoService } from '../services/falar-textos.service';

@Directive({
  selector: '[falarTexto]'
})
export class FalarTextoDirective {

  constructor(private elementRef: ElementRef, private falarTextoService: FalarTextoService) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.addEventListener('click', this.onElementClick.bind(this));
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.removeEventListener('click', this.onElementClick.bind(this));
  }

  onElementClick(): void {
    const text = this.elementRef.nativeElement.innerText;
    this.falarTextoService.speak(text);
  }
}
