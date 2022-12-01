import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'low';
  constructor(){
    let htmlRoot:HTMLElement = <HTMLElement> document.getElementsByTagName('html')[0];
    let bodyroot:HTMLElement = <HTMLElement> document.getElementsByTagName('body')[0];
    let fontFamily = window.localStorage.getItem('fontFamily');
      if(fontFamily != null && bodyroot.style.fontFamily !=fontFamily){
        bodyroot.style.fontFamily = fontFamily;
        window.localStorage.setItem('fontFamily', fontFamily);
      }
      let fontSize = window.localStorage.getItem('fontSize');
      if(fontSize != null && fontSize != htmlRoot.style.fontSize){
        htmlRoot.style.fontSize = fontSize + 'px';
        window.localStorage.setItem('fontSize', fontSize);
      }
    }


}
