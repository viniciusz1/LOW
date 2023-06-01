import { Directive, ElementRef, HostListener } from '@angular/core';
import { FalarTextoService } from '../services/falar-textos.service';

@Directive({
  selector: '[falarTexto]'
})
export class FalarTextoDirective {

  constructor(private elementRef: ElementRef, private falarTextoService: FalarTextoService) { }

  @HostListener('click')
  onElementClick(): void {
    const text = this.elementRef.nativeElement.innerText;
    this.falarTextoService.speak(text);
  }

  @HostListener('mouseenter')
  onElementMouseEnter(): void {
    if (this.falarTextoService.permitirFala) {
      this.elementRef.nativeElement.style.cursor = 'pointer';
      this.elementRef.nativeElement.style.backgroundColor = 'grey';
    }
  }

  @HostListener('mouseleave')
  onElementMouseLeave(): void {
    this.elementRef.nativeElement.style.backgroundColor = '';
  }
}
