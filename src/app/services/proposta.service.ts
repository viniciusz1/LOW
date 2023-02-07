import { TipoDespesa } from './../models/tipoDespesa.enum';
import { Recurso } from './../models/recurso.model';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { Proposta } from '../models/proposta.model';
import { Validators } from 'ngx-editor';

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
      periodoExMesesRecurso:  [''],
      centrosCusto: this.fb.array([
        this.createCenterOfCost()
      ])
  });

  createCenterOfCost() {
    return this.fb.group({
      porcentagem: [null, Validators.required],
      centroCusto: [null, Validators.required]
    });
  }

  addCenterOfCost() {
    (this.formRecursos.controls.centrosCusto as FormArray).push(this.createCenterOfCost());
    console.log(this.formRecursos)
  }

  formProposta = this.fb.group({
    prazoProposta: [''],
    codigoPPMProposta: [''],
    jiraProposta: [''],
    recursosProposta: [this.listaRecursos],
    escopoDemandaProposta: [''],
    inicioExDemandaProposta: [''],
    fimExDemandaProposta: [''],
    paybackProposta: [''],
    responsavelProposta: ['3'],
    demandaAnalistaProposta: {'codigoDemandaAnalista': 13}
  });

  arrumarFormularioParaBackend(){
    let centroDeCustoRecurso: {codigoCentroCusto: number}[] = []
    
    this.listaRecursos.forEach(e => {
    
    })
  }

  postProposta() {
    this.arrumarFormularioParaBackend();
    return this.http.post<Demanda | string>(
      'http://localhost:8080/proposta',

      this.formProposta.value
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}
}
