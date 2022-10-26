import { StatusDemanda } from './../../models/statusDemanda.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Demanda } from 'src/app/models/demanda.model';

@Component({
  selector: 'app-card-demanda',
  templateUrl: './card-demanda.component.html',
  styleUrls: ['./card-demanda.component.scss'],
  providers: [NgbDropdownConfig]
})
export class CardDemandaComponent implements OnInit {
  @Output() abrirModal = new EventEmitter();
  @Output() verDocumentoProposta = new EventEmitter()
  @Input() mudarTamanho: string = "350px"
  @Input() isPauta: boolean = false;
  @Input() dadosDemada: Demanda = {}
  @Input() rascunho: boolean = false;
  primaryColorClass: string = "";
  secondaryColorClass: string = "";

  constructor() {
  }

  ngOnInit(): void {
    this.dadosDemada.statusDemanda = StatusDemanda.ASSESSMENT
    this.primaryColorClass = this.dadosDemada.statusDemanda;
    this.secondaryColorClass = this.dadosDemada.statusDemanda + "-sec";
  }

}
