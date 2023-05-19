import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-v-libras',
  templateUrl: './v-libras.component.html',
  styleUrls: ['./v-libras.component.scss']
})
export class VLibrasComponent implements OnInit {
  @ViewChild('vlibrasToggleButton')
  vlibrasToggleButton: ElementRef | undefined;
  vLibrasActive: boolean = false;

  constructor(private renderer: Renderer2, private route: ActivatedRoute) {
    route.url.subscribe(() => {
      this.initVLibras();
    })
  }

  ngOnInit(): void {

  }
  private initVLibras() {
    const vLibrasScript = this.renderer.createElement('script');
    vLibrasScript.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    vLibrasScript.onload = async () => {
      //@ts-ignore
      await new window.VLibras.Widget('https://vlibras.gov.br/app');
    };
    this.renderer.appendChild(document.body, vLibrasScript);
  }

}
interface Window {
  VLibras: {
    Widget: any; // Substitua 'any' pelo tipo correto, se disponível
  };
}
