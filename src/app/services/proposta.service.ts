import { TipoDespesa } from './../models/tipoDespesa.enum';
import { Recurso } from './../models/recurso.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  public listaRecursos:RecursoDoForm[] = [ ]

  public formRecursos = this.fb.group({
  nomeRecurso: [''],
  tipoDespesaRecurso: [''],
  perfilDespesaRecurso: [''],
  quantidadeHorasRecurso: [''],
  valorHoraRecurso: [''],
  periodoExMesesRecurso: [''],
  centrosCusto: this.fb.array([this.createCentroCusto()])
});

createCentroCusto(): FormGroup {
  return this.fb.group({
    porcentagem: [''],
    centroCusto: ['']
  });
}



  addCenterOfCost() {
    (this.formRecursos.controls.centrosCusto as FormArray).push(this.createCentroCusto());
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
