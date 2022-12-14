import { Reuniao } from './../../models/reuniao.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-card-reuniao',
  templateUrl: './card-reuniao.component.html',
  styleUrls: ['./card-reuniao.component.scss']
})
export class CardReuniaoComponent implements OnInit {
  @Input() dadosReuniao: Reuniao = {};
  @Output() cancelarReuniao = new EventEmitter();
  @Output() motivoCancelamento = new EventEmitter();
  primaryColorClass?: string = "";
  secondaryColorClass: string = "";
  constructor() { }

  ngOnInit(): void {
    this.primaryColorClass = this.dadosReuniao.statusReuniao;
    this.secondaryColorClass = this.dadosReuniao.statusReuniao + "-sec";
1  }

}
