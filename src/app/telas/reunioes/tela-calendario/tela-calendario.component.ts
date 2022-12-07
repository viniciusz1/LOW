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

  constructor(private route: Router,public dialogRef: DialogRef) { }

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
    titleFormat: { year: 'numeric', month: 'long' },
    eventClick: (arg) => {
      this.route.navigate(['/tela-inicial/ver-pauta']);
      this.dialogRef.close()
    },
    events: [
      { title: 'Sistema de gerenciamento de clientes', date: '2022-12-01' },
      { title: 'Sistema de criação de motores', date: '2022-12-02' }
    ]
  };
  handleDateClick(arg : any) {
    alert('date click! ' + arg.dateStr)
  }
}
