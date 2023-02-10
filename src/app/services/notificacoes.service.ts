import { Injectable } from '@angular/core';
import { Client, Message, StompHeaders, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {
    private client: Client;
    private subscription: StompSubscription;
  
    constructor() {
      this.client = new Client();
      this.client.webSocketFactory = () => {
        return new SockJS('http://localhost:8080/app/ws');
      };
    }
  
    public connect() {
      this.client.connect({}, () => {
        this.subscription = this.client.subscribe('/topic/demand-status/' + demandId, this.onMessageReceived);
      });
    }
  
    public disconnect() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.client.disconnect();
    }
  
    private onMessageReceived = (message: Message) => {
      // aqui você pode processar a mensagem recebida
      const demandStatus = JSON.parse(message.body);
      console.log('Notificação recebida: ', demandStatus);
    }
}