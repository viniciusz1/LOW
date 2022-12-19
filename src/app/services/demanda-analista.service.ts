import { FormBuilder } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { StatusDemanda } from '../models/statusDemanda.enum';

@Injectable({
  providedIn: 'root',
})
export class DemandaAnalistaService {
  public demandaAnalistaForm = this.fb.group({
    tamanhoDemandaAnalista: [''],
    buSolicitanteDemandaAnalista:[''],
    busBeneficiadasDemandaAnalista:[''],
    demandaDemandaAnalista: { codigoDemanda: 22 },
    analista: { codigoUsuario: 6 },
    secaoDemandaAnalista: [''],
  });

  postProposta() {
    console.log(this.demandaAnalistaForm.value);
    return this.http.post<Demanda | string>(
      'http://localhost:8080/demandaAnalista',

      this.demandaAnalistaForm.value
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}
}
