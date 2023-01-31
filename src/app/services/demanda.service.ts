import { Page } from './../models/page.model';
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
    frequenciaDeUsoDemanda: [''],
    solicitanteDemanda: {
      codigoUsuario: 2
    },
  });

  public arquivos: File[] = [];

  getDemandas() {
    return this.http.get<Demanda[]>(
      // 'http://localhost:8080/demanda'
      'https://63502d89df22c2af7b65c0d9.mockapi.io/api/demanda'
    );
  }

  getDemandasTelaInicial(){
      return this.http.get<Page[]>(
        // 'http://localhost:8080/demanda'
        'http://localhost:8080/demanda/status'
      );
  }

  getDemandaByCodigoDemanda(codigoDemanda:number){
    return this.http.get<Demanda>(
      'http://localhost:8080/demanda/'+codigoDemanda
    )
  }

  formatarStatusDemanda(demandas: Demanda[]){
    for(let i of demandas){

    }
  }

  postDemanda() {
    let demandaFormData = new FormData();
    let teste = this.arquivos.map(item => demandaFormData.append('arquivos', item, item.name)) ;

    demandaFormData.append('demanda', JSON.stringify(this.demandaForm.value));
    console.log(demandaFormData.getAll('arquivos'))
    return this.http.post<Demanda | string>(
      'http://localhost:8080/demanda', demandaFormData
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}
}
