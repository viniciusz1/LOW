import { Reuniao } from './../../models/reuniao.model';
import { Component, Input, OnInit } from '@angular/core';
import { StatusReuniao } from 'src/app/models/statusReuniao.enum';

@Component({
  selector: 'app-card-reuniao',
  templateUrl: './card-reuniao.component.html',
  styleUrls: ['./card-reuniao.component.scss']
})
export class CardReuniaoComponent implements OnInit {
  @Input() dadosReuniao: Reuniao = {};
  primaryColorClass?: string = "";
  secondaryColorClass: string = "";
  constructor() { }

  ngOnInit(): void {
    this.dadosReuniao.statusReuniao = StatusReuniao.CANCELADO
    this.primaryColorClass = this.dadosReuniao.statusReuniao;
    this.secondaryColorClass = this.dadosReuniao.statusReuniao + "-sec";
  }

}
