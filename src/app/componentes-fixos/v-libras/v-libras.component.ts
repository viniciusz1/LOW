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
    // route.url.subscribe(() => {
    //   this.renderer.removeChild(document.body, this.vLibrasScript);
    // })
    this.initVLibras();
  }

  ngOnInit(): void {

  }

  vLibrasScript: any;

  private initVLibras() {

    const vLibrasScript = this.renderer.createElement('script');
    vLibrasScript.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    setTimeout(() => {

      //@ts-ignore
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    }, 2000)
    this.renderer.appendChild(document.body, vLibrasScript);
  }

}
