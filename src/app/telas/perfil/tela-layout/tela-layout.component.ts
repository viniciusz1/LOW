import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-layout',
  templateUrl: './tela-layout.component.html',
  styleUrls: ['./tela-layout.component.scss']
})
export class TelaLayoutComponent implements OnInit {
  themeSelection: boolean = false
  constructor() {
    // @Inject(DOCUMENT) private document: Document

    // let theme = window.localStorage.getItem('theme');
    // if(theme){
    //   this.themeSelection = theme == 'dark' ? true : false;
    //   this.changeTheme(this.themeSelection);
    // }
    let font = window.localStorage.getItem('fontFamily');
    if(font){
      this.fontAtual = font
    }
    let fontSize = window.localStorage.getItem('fontSize');
    if(fontSize){
      this.fontSize = fontSize
    }
   }

  // changeTheme(state:boolean){
  //   let theme = state ? 'dark' : 'light';
  //   window.localStorage.setItem('theme', theme);
  //   let themelink = this.document.getElementById('app-theme') as HTMLLinkElement;
  //   themelink.href = `bootstrap-${theme}-blue.css`;
  // }

  fontSize = "13";
  fontAtual = "Roboto"

  setFontTheme(opc: string){
    let htmlRoot:HTMLElement = <HTMLElement> document.getElementsByTagName('body')[0];
    if(htmlRoot != null){
      htmlRoot.style.fontFamily = opc;
      window.localStorage.setItem('fontFamily', opc);
    }
  }

  setFontSize(opc: string){
   this.fontSize = opc;

    let htmlRoot:HTMLElement = <HTMLElement> document.getElementsByTagName('html')[0];
    if(htmlRoot != null && window.localStorage.getItem('fontSize') != htmlRoot.style.fontSize){
      htmlRoot.style.fontSize = this.fontSize + 'px';
      window.localStorage.setItem('fontSize', this.fontSize);
    }
  }


  ngOnInit(): void {
  }

}
