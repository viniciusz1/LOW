import { DemandaAnalista } from './../models/demanda-analista.model';
import { FormBuilder } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { StatusDemanda } from '../models/statusDemanda.enum';
import { RESIZE_TIME_THRESHOLD } from 'ng-spy';

@Injectable({
  providedIn: 'root',
})
export class DemandaAnalistaService {
  public demandaAnalistaForm = this.fb.group({
    tamanhoDemandaAnalista: [''],
    buSolicitanteDemandaAnalista:[''],
    busBeneficiadasDemandaAnalista:[''],
    codigoDemanda: [''],
    analista: { codigoUsuario: 1 },
    secaoDemandaAnalista: [''],
  });
  postProposta(codigoDemanda: string | undefined) {
    if(codigoDemanda != undefined){
    this.demandaAnalistaForm.controls.codigoDemanda.setValue(codigoDemanda);
    }
    return this.http.post<Demanda | string>(
      'http://localhost:8080/demandaAnalista',

      this.demandaAnalistaForm.value
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}
}
