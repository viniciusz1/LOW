import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';

@Component({
  selector: 'app-rascunhos',
  templateUrl: './rascunhos.component.html',
  styleUrls: ['./rascunhos.component.scss']
})
export class RascunhosComponent implements OnInit {
    @Output() abrirModal = new EventEmitter();
    @Input() mudarTamanho:string = "350px"
    @Input() isPauta: boolean = false;
    @Input() dadosDemada: Demanda = {}

  constructor() { }

  ngOnInit(): void {
  }

}
