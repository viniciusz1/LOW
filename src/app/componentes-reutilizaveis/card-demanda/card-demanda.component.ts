import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-demanda',
  templateUrl: './card-demanda.component.html',
  styleUrls: ['./card-demanda.component.scss'],
  providers: [NgbDropdownConfig]
})
export class CardDemandaComponent implements OnInit {
  @Output() abrirModal = new EventEmitter();
  @Input() mudarTamanho:string = "350px"
  @Input() isPauta: boolean = false;

  constructor() {
   }

  ngOnInit(): void {
  }

}
