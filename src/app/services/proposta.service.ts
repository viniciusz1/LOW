import { TipoDespesa } from './../models/tipoDespesa.enum';
import { Recurso } from './../models/recurso.model';
import { FormBuilder } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';

@Injectable({
  providedIn: 'root',
})
export class PropostaService {

  recursos: Recurso[] = [
    {
      codigoRecurso: '1',
      nomeRecurso: 'Recurso 1',
      tipoDespesaRecurso: TipoDespesa.EXTERNO,
      perfilDespesaRecurso: 'Perfil 1',
      quantidadeHorasRecurso: 1,
      valorHoraRecurso: 1,
      periodoExMesesRecurso: 1,
      centrosCustoPagantesRecurso: [],
    },
  ];
  formProposta = this.fb.group({
    prazoProposta: [''],
    codigoPPMProposta: [''],
    jiraProposta: [''],
    recursosProposta: [this.recursos],
    escopoDemanda: [''],
    inicioExDemanda: [''],
    fimExDemanda: [''],
    paybackSimplesDemanda: [''],
    responsaveisNegocioDemanda: [''],
    demandaAnalistaProposta: {'codigoDemandaAnalista': 23}
  });
  postProposta() {
    console.log(this.formProposta.value);
    return this.http.post<Demanda | string>(
      'http://localhost:8080/proposta',

      this.formProposta.value
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}
}
