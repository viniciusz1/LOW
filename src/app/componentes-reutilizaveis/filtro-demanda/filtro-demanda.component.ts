import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-filtro-demanda',
  templateUrl: './filtro-demanda.component.html',
  styleUrls: ['./filtro-demanda.component.scss'],
})
export class FiltroDemandaComponent implements OnInit {
  @Output() closeFiltro = new EventEmitter();
  @Output() filtroAcionado = new EventEmitter<{solicitante: string,codigoDemanda:string,status: string, tamanho:string, tituloDemanda: string, analista: string, departamento: string }>();
  @Output() exportarExcel = new EventEmitter<{solicitante: string,codigoDemanda:string,status: string, tamanho:string, tituloDemanda: string, analista: string, departamento: string }>();
  @Input() mostrarIconeDeAbrirFiltro = true;
  @Input() filtroReduzidoVertical = false;
  tamanho: {tamanho: string}[] = [];
  status: {status: string}[] = [];
  // tamanho: any[] = [];
  valorTamanho: any;
  valorStatus: any;

  atualizarFiltro(){

  }

  constructor() {
    this.tamanho = [
      {tamanho: "Muito Pequeno"},
      {tamanho: "Pequeno"},
      {tamanho: "Médio"},
      {tamanho: "Grande"},
      {tamanho: "Muito Grande"},
    ]

    this.status = [
      {status: "Backlog"},
      {status: "Assessment"},
      {status: "To-Do"},
      {status: "Cancelled"},
      {status: "Done"},
    ]
  }

  ngOnInit(): void {
  }
}
