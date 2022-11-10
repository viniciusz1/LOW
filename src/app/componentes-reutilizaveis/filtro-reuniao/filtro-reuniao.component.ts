import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtro-reuniao',
  templateUrl: './filtro-reuniao.component.html',
  styleUrls: ['./filtro-reuniao.component.scss']
})
export class FiltroReuniaoComponent implements OnInit {
  @Output() closeFiltro = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}