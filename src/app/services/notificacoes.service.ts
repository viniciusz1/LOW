import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class DemandStatusNotificationService {
  private stompClient: Stomp;

  constructor() { }

  connect(demandId: string) {
    const socket = new SockJS('/demand-status-websocket');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/demand-status/${demandId}`, (demandStatus: any) => {
        console.log(demandStatus);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }
}