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
    1
  }

  titulosPropostas() {

    const propostasAdicionadas = this.dadosReuniao.propostasReuniao;
    const titulosPropostas: string[] = [];

    propostasAdicionadas?.forEach((proposta: any) => {
      const titulo = proposta.tituloDemanda;
      titulosPropostas.push(titulo);
    })

    return titulosPropostas;
  }

  departamentosBeneficiados() {
    const propostasAdicionadas = this.dadosReuniao.propostasReuniao;
    const buBeneficiada: string[] = [];

    propostasAdicionadas?.forEach((proposta: any) => {
      const bu = proposta.busBeneficiadasDemandaClassificada;
      buBeneficiada.push(bu);
    })

    return buBeneficiada;

  }


}
