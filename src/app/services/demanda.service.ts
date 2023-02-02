import { FormBuilder } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { StatusDemanda } from '../models/statusDemanda.enum';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DemandaService {
  public demandaForm = this.fb.group({
    tituloDemanda: ['', [Validators.required]],
    situacaoAtualDemanda: ['',[Validators.required]],
    objetivoDemanda: ['', [Validators.required]],
    centroCustos: ['', [Validators.required]],
    beneficioRealDemanda: this.fb.group({
      moedaBeneficio: ['', [Validators.required]],
      memoriaDeCalculoBeneficio: ['', [Validators.required]],
      valorBeneficio: ['', [Validators.required]],
    }),
    beneficioPotencialDemanda: this.fb.group({
      moedaBeneficio: ['', [Validators.required]],
      memoriaDeCalculoBeneficio: ['', [Validators.required]],
      valorBeneficio: ['', [Validators.required]],
    }),
    beneficioQualitativoDemanda: ['', [Validators.required]],
    anexoDemanda: [''],
    frequenciaDeUsoDemanda: ['', [Validators.required]],
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
      'http://localhost:8080/demanda'
      // 'https://63502d89df22c2af7b65c0d9.mockapi.io/api/demanda'
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

  avaliacaoGerenteDeNegocioDemanda(codigoDemanda : number, decisao: number) {
    console.log(codigoDemanda, decisao);
    return this.http.put<any>(`http://localhost:8080/demanda/update/backlog/${codigoDemanda}`, decisao)
    .subscribe();
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}
}
