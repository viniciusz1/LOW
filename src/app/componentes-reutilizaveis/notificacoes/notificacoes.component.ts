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
  events1: any[] = [];

  events2: any[] = [];

  ngOnInit() {
    this.notificacoesService.ativarWebSocket()

    this.events1 = [
      { message: 'Sua demanda está sendo analisada pelo Gerente de TI', date: '15/10/2020 10:30', icon: PrimeIcons.CHECK, color: 'blue' },
      { message: 'A demanda de código 22356 foi cancelada', date: '15/10/2020 14:00', icon: PrimeIcons.REFRESH, color: 'red' },
      { message: 'O analista está verificando sua demanda', date: '15/10/2020 16:15', icon: PrimeIcons.HOURGLASS, color: '#2196f3' },
      { message: 'Sua demanda está sendo analisada pelo Gerente de TI', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#00579d' },
      { message: 'Sua demanda está sendo analisada pelo Gerente de TI', date: '15/10/2020 10:30', icon: PrimeIcons.CHECK, color: 'blue' },
      { message: 'A demanda de código 22356 foi cancelada', date: '15/10/2020 14:00', icon: PrimeIcons.REFRESH, color: 'red' },
      { message: 'O analista está verificando sua demanda', date: '15/10/2020 16:15', icon: PrimeIcons.HOURGLASS, color: '#2196f3' },
      { message: 'Sua demanda está sendo analisada pelo Gerente de TI', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#00579d' }
    ];

    this.events2 = [
      "2020", "2021", "2022", "2023"
    ];
  }
}
