import { FormBuilder } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { StatusDemanda } from '../models/statusDemanda.enum';

@Injectable({
  providedIn: 'root',
})
export class DemandaService {
  public demandaForm = this.fb.group({
    tituloDemanda: [''],
    situacaoAtualDemanda: [''],
    objetivoDemanda: [''],
    centroCustos: [''],
    beneficioRealDemanda: this.fb.group({
      moedaBeneficio: [''],
      memoriaDeCalculoBeneficio: [''],
      valorBeneficio: [''],
    }),
    beneficioPotencialDemanda: this.fb.group({
      moedaBeneficio: [''],
      memoriaDeCalculoBeneficio: [''],
      valorBeneficio: [''],
    }),
    beneficioQualitativoDemanda: [''],
    anexoDemanda: [''],
    frequenciaDeUsoDemanda: [''],
    solicitanteDemanda: {
      codigoUsuario: 3
    },
  });

  getDemandas() {
    return this.http.get<Demanda[]>(
      // 'http://localhost:8080/demanda'
      'https://63502d89df22c2af7b65c0d9.mockapi.io/api/demanda'
    );
  }

  formatarStatusDemanda(demandas: Demanda[]){
    for(let i of demandas){

    }
  }

  postDemanda() {
    console.log(this.demandaForm.value);
    return this.http.post<Demanda | string>(
      'http://localhost:8080/demanda',

      this.demandaForm.value
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}
}
