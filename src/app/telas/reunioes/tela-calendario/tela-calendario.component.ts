import { Reuniao } from './../../../models/reuniao.model';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement, EventApi } from '@fullcalendar/web-component';
import brasil from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
defineFullCalendarElement();
@Component({
  selector: 'app-tela-calendario',
  templateUrl: './tela-calendario.component.html',
  styleUrls: ['./tela-calendario.component.scss']
})
export class TelaCalendarioComponent implements OnInit {

  constructor(private route: Router,public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: Reuniao[]) {
      this.data.forEach(e => {
        this.events.push({title: e.comissaoReuniao, data: e.dataReuniao?.toString().substring(0,10)})
      })
      this.calendarOptions.events = this.events
    }

  ngOnInit(): void {

  }
  events: {title?: string, data?: string}[] = []



  calendarOptions: CalendarOptions = {
    locales: [brasil],
    locale: 'pt-br',
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    titleFormat: { year: 'numeric', month: 'long' },
    eventClick: (arg) => {
      this.route.navigate(['/tela-inicial/ver-pauta']);
      this.dialogRef.close()
    },
    eventsSet: this.handleEvents.bind(this)
  };
  handleDateClick(arg : any) {
    alert('date click! ' + arg.dateStr)
  }
  currentEvents: EventApi[] = []
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}
