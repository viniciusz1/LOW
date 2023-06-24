import { StatusReuniao } from 'src/app/models/statusReuniao.enum';
import { Reuniao } from './../../models/reuniao.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonalizacaoService } from 'src/app/services/personalizacao.service';

@Component({
  selector: 'app-card-reuniao',
  templateUrl: './card-reuniao.component.html',
  styleUrls: ['./card-reuniao.component.scss'],
})
export class CardReuniaoComponent implements OnInit {
  @Input() dadosReuniao: Reuniao = {};
  @Output() cancelarReuniao = new EventEmitter();
  @Output() motivoCancelamento = new EventEmitter();
  primaryColorClass?: string = '';
  secondaryColorClass: string = '';
  @Input() primaryColor?: string = '';
  @Input() secondaryColor: string = '';
  constructor(private personalizacaoService: PersonalizacaoService) {}

  getOrdinalValueStatusReuniao(
    value: StatusReuniao | undefined
  ): number | undefined {
    const enumValues = Object.values(StatusReuniao);
    const index = enumValues.indexOf(value as StatusReuniao);
    return index !== -1 ? index : undefined;
  }

  ngOnInit(): void {
    this.primaryColorClass = this.dadosReuniao.statusReuniao;
    this.secondaryColorClass = this.dadosReuniao.statusReuniao + '-sec';
    let ordinal = this.getOrdinalValueStatusReuniao(
      this.dadosReuniao.statusReuniao
    ) as number;
    if (
      this.personalizacaoService.personalizacaoAtiva
        .coresPrimariasReuniaoPersonalizacao &&
      this.personalizacaoService.personalizacaoAtiva
        .coresSecundariasReuniaoPersonalizacao
    ) {
      this.primaryColor =
        this.personalizacaoService.personalizacaoAtiva.coresPrimariasReuniaoPersonalizacao[
          ordinal
        ];
      this.secondaryColor =
        this.personalizacaoService.personalizacaoAtiva.coresSecundariasReuniaoPersonalizacao[
          ordinal
        ];
    }
  }

  titulosPropostas() {
    const propostasAdicionadas = this.dadosReuniao.propostasReuniao;
    const titulosPropostas: string[] = [];

    propostasAdicionadas?.forEach((proposta: any) => {
      const titulo = proposta.tituloDemanda;
      titulosPropostas.push(titulo);
    });

    return titulosPropostas;
  }

  departamentosBeneficiados() {
    const propostasAdicionadas = this.dadosReuniao.propostasReuniao;
    const buBeneficiada: string[] = [];

    propostasAdicionadas?.forEach((proposta: any) => {
      const bu = proposta.busBeneficiadasDemandaClassificada;
      buBeneficiada.push(bu);
    });

    return buBeneficiada;
  }
}
