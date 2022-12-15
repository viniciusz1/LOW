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
    "tamanhoDemandaAnalista":"MuitoPequeno",
    "buSolicitanteDemandaAnalista": {
        "codigoBusinessUnit": ['']
    },
    "busBeneficiadasDemandaAnalista":[{
        "codigoBusinessUnit": ['']
    }],
    "demandaDemandaAnalista": {
        "codigoDemanda": ['']
    },
    "analista": {
        "codigoUsuario": ['']
    },
    "sessaoDemandaAnalista": {
        "codigoSessao": ['']
    }
  });


  postProposta() {
    console.log(this.demandaAnalistaForm.value);
    return this.http.post<Demanda | string>(
      'http://localhost:8080/demanda',

      this.demandaAnalistaForm.value
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}
}
