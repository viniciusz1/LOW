import { Output, Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';

@Component({
  selector: 'app-list-demanda',
  templateUrl: './list-demanda.component.html',
  styleUrls: ['./list-demanda.component.scss']
})
export class ListDemandaComponent implements OnInit {
  primaryColorClass?: string = "";
  secondaryColorClass?: string = "";
  @Output() verDocumentoProposta = new EventEmitter();
  @Output() clicouAdicionarPauta = new EventEmitter();
  @Input() dadosDemada: Demanda = {};
  @Input() mostrarBotao = true;
  @Input('mostrarIconeAdicionar') demandaPequena = false;

  constructor() { }

  ngOnInit(): void {
    this.primaryColorClass = this.dadosDemada.statusDemanda;
    this.secondaryColorClass = this.dadosDemada.statusDemanda + "-sec";
  }

}
