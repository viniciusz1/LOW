import { Page } from './../models/page.model';
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
    frequenciaDeUsoDemanda: ['', [Validators.required]],
    solicitanteDemanda: {
      codigoUsuario: 3
    },
  });

  public arquivos: File[] = [];

  saveByteArray(bytes : string, type: string, name: string) {
    var blob = new Blob([bytes],{type:type});
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = name;
    link.click();
  }

  getDemandasFiltradas(filtros: { solicitante: string; codigoDemanda: string; status: string; tamanho: string; tituloDemanda: string; }){
    return this.http.get<Demanda[]>(
      `http://localhost:8080/demanda/filtro?solicitante=${filtros.solicitante}&codigoDemanda=${filtros.codigoDemanda}&status=${filtros.status}&tamanho=${filtros.tamanho}&tituloDemanda=${filtros.tituloDemanda}`
    );
  }

  getDemandas() {
    return this.http.get<Demanda[]>(
      'http://localhost:8080/demanda'
      // 'https://63502d89df22c2af7b65c0d9.mockapi.io/api/demanda'
    );
  }

  getDemandasTelaInicial(){
      return this.http.get<[][]>(
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

  avancarStatusDemandaComDecisao(codigoDemanda : string , decisao: number) {
    return this.http.put<any>(`http://localhost:8080/demanda/update/status/${codigoDemanda}`, decisao)
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}
}
