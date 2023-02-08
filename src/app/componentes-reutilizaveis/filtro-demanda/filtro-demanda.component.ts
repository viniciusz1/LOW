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
  @Input() mostrarIconeDeAbrirFiltro = true;
  @Input() filtroReduzidoVertical = false;
  constructor() { }

  ngOnInit(): void {
  }
}
