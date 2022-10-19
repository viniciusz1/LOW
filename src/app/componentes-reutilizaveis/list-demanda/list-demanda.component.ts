import { Component, OnInit, Input } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';

@Component({
  selector: 'app-list-demanda',
  templateUrl: './list-demanda.component.html',
  styleUrls: ['./list-demanda.component.scss']
})
export class ListDemandaComponent implements OnInit {

  @Input() dadosDemada: Demanda = {}
  constructor() { }

  ngOnInit(): void {
  }

}
