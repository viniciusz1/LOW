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

  public arquivos: FileList[] = [];

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
    let demandaFormData = new FormData();
    demandaFormData.append('arquivos', JSON.stringify(this.arquivos));
    demandaFormData.append('demanda', JSON.stringify(this.demandaForm.value));
    console.log(demandaFormData.getAll('arquivos'))
    return this.http.post<Demanda | string>(
      'http://localhost:8080/demanda', demandaFormData
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}
}
