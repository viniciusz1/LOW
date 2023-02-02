import { TipoDespesa } from './../models/tipoDespesa.enum';
import { Recurso } from './../models/recurso.model';
import { FormArray, FormBuilder } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { Proposta } from '../models/proposta.model';

@Injectable({
  providedIn: 'root',
})
export class PropostaService {
  listaRecursos:Recurso[] = []

  formRecursos = this.fb.group({
      codigoRecurso:[''],
      nomeRecurso:  [''],
      tipoDespesaRecurso:  [''],
      perfilDespesaRecurso:  [''],
      quantidadeHorasRecurso:  [''],
      valorHoraRecurso:  [''],
      periodoExMesesRecurso:  ['']
  });


  formProposta = this.fb.group({
    prazoProposta: [''],
    codigoPPMProposta: [''],
    jiraProposta: [''],
    recursosProposta: [this.formRecursos],
    escopoDemandaProposta: [''],
    inicioExDemandaProposta: [''],
    fimExDemandaProposta: [''],
    paybackProposta: [''],
    responsavelProposta: ['3'],
    demandaAnalistaProposta: {'codigoDemandaAnalista': 13}
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
