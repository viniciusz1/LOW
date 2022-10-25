import { Component, OnInit, Input } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';

@Component({
  selector: 'app-list-demanda',
  templateUrl: './list-demanda.component.html',
  styleUrls: ['./list-demanda.component.scss']
})
export class ListDemandaComponent implements OnInit {
  primaryColorClass: string = "";
  @Input() dadosDemada: Demanda = {}
  constructor() { }

  ngOnInit(): void {
    this.dadosDemada.statusDemanda = StatusDemanda.ASSESSMENT
    this.primaryColorClass = this.dadosDemada.statusDemanda;
  }

}
