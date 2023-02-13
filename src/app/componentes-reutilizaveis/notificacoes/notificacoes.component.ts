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
    stompClient: any
    socket: any = ''
    notificacoes: Notificacao[] = []

    ngOnInit() {
      this.notificacoesService.getNotificacoes(2).subscribe(notificacoes => {
        this.notificacoes = notificacoes
      })
    }
}
