import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro-demanda',
  templateUrl: './filtro-demanda.component.html',
  styleUrls: ['./filtro-demanda.component.scss']
})
export class FiltroDemandaComponent implements OnInit {
  @Output() closeFiltro = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
