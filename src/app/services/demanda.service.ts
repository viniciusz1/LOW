import { FormBuilder } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';

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
      codigoUsuario: 1,
      nomeUsuario: '1',
      userUsuario: '1',
      emailUsuario: '1',
      senhaUsuario: '1',
      departamentoUsuario: {
        codigoDepartamento: 1,
        nome: '1',
      },
      nivelAcessoUsuario: 'Solicitante',
    },
  });

  getDemandas() {
    return this.http.get<Demanda[]>(
      'https://63502d89df22c2af7b65c0d9.mockapi.io/api/demanda'
    );
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
