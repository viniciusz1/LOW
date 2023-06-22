import { Notificacao } from './../../models/notificacao.model';
import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { NotificacoesService } from 'src/app/services/notificacoes.service';
import { fadeAnimation } from 'src/app/shared/app.animation';
@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss'],
  animations: [fadeAnimation]
})

export class NotificacoesComponent implements OnInit {
  constructor(private notificacoesService: NotificacoesService) {
  }
  notificacoes: Notificacao[] = []

  ngOnInit() {
    // this.subscribeNotification();
    this.setarNotificacoes();
  }

  ngOnDestroy(): void {
    this.notificacoesService.disconect();
    this.notificacoesService.initializeWebSocketConnectionCount();
  }

  setarNotificacoes() {
    this.notificacoesService.getNotificacoes().subscribe(notificacoes => {
      this.notificacoes = notificacoes.reverse();
    })
  }

  // subscribeNotification() {
  //   this.notificacoesService.$notificationEmmiter.subscribe(notificacoes => {
  //     // this.setarNotificacoes()
  //     this.notificacoes = []
  //     this.notificacoes.push(...notificacoes)
  //     this.notificacoes = this.notificacoes.reverse();
  //   })
  // }
}

