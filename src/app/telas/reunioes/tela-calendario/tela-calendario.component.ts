import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import brasil from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
defineFullCalendarElement();
@Component({
  selector: 'app-tela-calendario',
  templateUrl: './tela-calendario.component.html',
  styleUrls: ['./tela-calendario.component.scss']
})
export class TelaCalendarioComponent implements OnInit {

  constructor(private route: Router,private dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  

  calendarOptions: CalendarOptions = {
    locales: [brasil],
    locale: 'pt-br',
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    eventClick: (arg) => {
      this.route.navigate(['/tela-inicial/ver-pauta']);
      this.dialogRef.close()
    },
    events: [
      { title: 'event 1', date: '2022-11-01' },
      { title: 'event 2', date: '2022-11-02' }
    ]
  };
  handleDateClick(arg : any) {
    alert('date click! ' + arg.dateStr)
  }
}
