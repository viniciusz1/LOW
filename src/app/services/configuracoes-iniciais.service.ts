import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesIniciaisService {

  fontSize = "15";
  fontAtual = "Roboto"

  setFontTheme(opc: string | undefined){
    let htmlRoot:HTMLElement = <HTMLElement> document.getElementsByTagName('body')[0];
    if(opc == undefined){
      opc = this.fontAtual;
    }
    if(htmlRoot != null){
      htmlRoot.style.fontFamily = opc;
      window.localStorage.setItem('fontFamily', opc);
    }
  }

  setFontSize(opc: string | undefined){
    if(opc != undefined){
      this.fontSize = opc;
    }

    let htmlRoot:HTMLElement = <HTMLElement> document.getElementsByTagName('html')[0];
    if(htmlRoot != null && window.localStorage.getItem('fontSize') != htmlRoot.style.fontSize){
      htmlRoot.style.fontSize = this.fontSize + 'px';
      window.localStorage.setItem('fontSize', this.fontSize);
    }
  }

  redefinir(){
    this.setFontTheme('Roboto')
    this.setFontSize('15')
  }

  constructor() {
    let font = window.localStorage.getItem('fontFamily');
    if(font){
      this.fontAtual = font
    }
    let fontSize = window.localStorage.getItem('fontSize');
    if(fontSize){
      this.fontSize = fontSize
    }
   }
}
