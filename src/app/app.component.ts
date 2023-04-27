import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WebSocketConnector } from './websocket/websocket-connector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'low';
  private webSocketConnector: WebSocketConnector | undefined
  constructor(translate: TranslateService, private http: HttpClient){


    translate.setDefaultLang('pt');
    translate.use('pt');

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
    ngOnInit(): void {
      this.webSocketConnector = new WebSocketConnector('http://localhost:8085/low', 'teste', this.onMessage.bind(this))
    }
    start(){
      this.http.put('http://localhost:8085/', {})
      .subscribe(response => console.log(response))
    }
    onMessage(message: any){
      console.log(message)
    }

}
