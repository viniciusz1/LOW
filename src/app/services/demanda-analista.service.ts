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
    demandaDemandaAnalista: { codigoDemanda: '' },
    analista: { codigoUsuario: 3 },
    secaoDemandaAnalista: [''],
  });
  postProposta(codigoDemanda: string | undefined) {
    if(codigoDemanda != undefined){
    this.demandaAnalistaForm.controls.demandaDemandaAnalista.setValue({codigoDemanda: codigoDemanda})
    }
    return this.http.post<Demanda | string>(
      'http://localhost:8080/demandaAnalista',

      this.demandaAnalistaForm.value
    );
  }
  getDemandaAnalistaByCodigoDemanda(codigoDemanda: string) {
    return this.http.get<DemandaAnalista>(
      `http://localhost:8080/demandaAnalista/demanda/${codigoDemanda}`
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}
}
