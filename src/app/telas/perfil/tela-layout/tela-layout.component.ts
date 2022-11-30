import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-layout',
  templateUrl: './tela-layout.component.html',
  styleUrls: ['./tela-layout.component.scss']
})
export class TelaLayoutComponent implements OnInit {
  themeSelection: boolean = false
  constructor(@Inject(DOCUMENT) private document: Document) {
    let theme = window.localStorage.getItem('theme');
    if(theme){
      this.themeSelection = theme == 'dark' ? true : false;
      this.changeTheme(this.themeSelection);
    }
   }

  changeTheme(state:boolean){
    let theme = state ? 'dark' : 'light';
    window.localStorage.setItem('theme', theme);
    let themelink = this.document.getElementById('app-theme') as HTMLLinkElement;
    themelink.href = `bootstrap-${theme}-blue.css`;
  }
  ngOnInit(): void {
  }

}
