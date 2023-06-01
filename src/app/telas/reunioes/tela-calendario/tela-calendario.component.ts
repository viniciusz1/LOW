import { StatusReuniao } from './../../../models/statusReuniao.enum';
import { Reuniao } from './../../../models/reuniao.model';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement, EventApi } from '@fullcalendar/web-component';
import brasil from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MessageService } from 'primeng/api';
import { path } from 'src/app/services/path/rota-api';
defineFullCalendarElement();
@Component({
  selector: 'app-tela-calendario',
  templateUrl: './tela-calendario.component.html',
  styleUrls: ['./tela-calendario.component.scss']
})
export class TelaCalendarioComponent implements OnInit {

  defineColorReuniao(status: StatusReuniao | undefined) {
    if (status == StatusReuniao.CANCELADO) return 'red';
    else if (status == StatusReuniao.CONCLUIDO) return 'green';
    else if (status == StatusReuniao.PROXIMO) return 'yellow';
    else if (status == StatusReuniao.PENDENTE) return 'orange';
    else if (status == StatusReuniao.AGUARDANDO) return 'blue';
    return 'blue';
  }

  constructor(private route: Router, public dialogRef: DialogRef, private messageService: MessageService,
    @Inject(DIALOG_DATA) public data: Reuniao[]) {
    let events: { title?: string, date?: Date, url?: string, color: string }[] = []
    data.forEach(reuniao => {
      events.push({ title: reuniao.comissaoReuniao, date: reuniao.dataReuniao, url:'http://localhost:4200/tela-inicial/ver-reuniao/' + reuniao.codigoReuniao, color: this.defineColorReuniao(reuniao.statusReuniao) })
    })

    this.calendarOptions = {
      locales: [brasil],
      locale: 'pt-br',
      plugins: [dayGridPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      }, events: events,
      titleFormat: { year: 'numeric', month: 'long' },
      eventClick: (arg) => {
        console.log(arg)
      },

      eventsSet: this.handleEvents.bind(this)
    };

  }

  ngOnInit(): void {

  }


  calendarOptions: CalendarOptions | undefined;
  ngAfterViewInit() {

  }
  currentEvents: EventApi[] = []
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
