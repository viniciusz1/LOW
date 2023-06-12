import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtro-reuniao',
  templateUrl: './filtro-reuniao.component.html',
  styleUrls: ['./filtro-reuniao.component.scss']
})
export class FiltroReuniaoComponent implements OnInit {
  @Output() closeFiltro = new EventEmitter();
  @Output() filtroAcionado = new EventEmitter<{
    nomeComissao: string;
    dataReuniao: string;
    statusReuniao: string;
    ppmProposta: string;
    analista: string;
    solicitante: string;
    ordenar: string;
    page: string;
    size: string
  }>();
  constructor() { }

  ngOnInit(): void {
  }

}
