import { TipoDespesa } from './../models/tipoDespesa.enum';
import { Recurso } from './../models/recurso.model';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { Proposta } from '../models/proposta.model';
import { Validators } from 'ngx-editor';

interface RecursoDoForm{
  nomeRecurso: string,
  tipoDespesaRecurso: TipoDespesa,
  perfilDespesaRecurso: string,
  quantidadeHorasRecurso: number,
  valorHoraRecurso: number,
  periodoExMesesRecurso: number,
  centrosCusto?: {porcentagem: number, centroCusto: number}[]
  porcentagemCustoRecurso: number[],
  centroDeCustoRecurso: {codigoCentroCusto:number}[]
}

@Injectable({
  providedIn: 'root',
})
export class PropostaService {
  listaRecursos:RecursoDoForm[] = [ ]

  formRecursos = this.fb.group({
      codigoRecurso:['', [Validators.required]],
      nomeRecurso:  ['', [Validators.required]],
      tipoDespesaRecurso:  ['', [Validators.required]],
      perfilDespesaRecurso:  ['', [Validators.required]],
      quantidadeHorasRecurso:  ['', [Validators.required]],
      valorHoraRecurso:  ['', [Validators.required]],
      periodoExMesesRecurso:  ['', [Validators.required]],
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
    responsavelProposta: { 'codigoUsuario': 6},
    demandaAnalistaProposta: {'codigoDemandaAnalista': 47}
  });

  arrumarFormularioParaBackend(){
    this.listaRecursos.forEach(e => {
      e.porcentagemCustoRecurso = [];
      e.centroDeCustoRecurso = [];
      if(e.centrosCusto){
      e.centrosCusto.forEach(centro => {
        e.porcentagemCustoRecurso.push(centro.porcentagem)
        e.centroDeCustoRecurso.push({codigoCentroCusto: centro.centroCusto})
        delete e.centrosCusto;
      })}
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
