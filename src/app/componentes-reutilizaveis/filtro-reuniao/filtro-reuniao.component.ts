import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Calendar } from 'primeng/calendar';

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

  statusReuniao: string[] = ['Aguardando', 'Proximo', 'Concluido', 'Cancelado', 'Pendente'];
  naoAparecer = false;

  constructor(private datePipe: DatePipe) { }

  emitirFiltro(dados: { nomeComissao: string, dataReuniao: Date | string, statusReuniao: string, ppmProposta: string, analista: string, solicitante: string, ordenar: string, page: string, size: string }) {
    let data = this.datePipe.transform(dados.dataReuniao, 'yyyy-MM-dd');
    if (data != undefined) {
      dados.dataReuniao = data as string
    } else {
      dados.dataReuniao = ''
    }
    if (dados.statusReuniao == undefined) {
      dados.statusReuniao = '';
    }
    //@ts-ignore
    this.filtroAcionado.emit(dados)

  }

  ngOnInit(): void {
  }

}
