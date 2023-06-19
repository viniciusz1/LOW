import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { path } from './path/rota-api';
import { Personalizacao } from '../models/personalizacao.model';


@Injectable({
  providedIn: 'root'
})
export class PersonalizacaoService {

  private _personalizacaoAtiva: Personalizacao = {}

  get personalizacaoAtiva(){
    if(this._personalizacaoAtiva == undefined){
      let personaliza = localStorage.getItem('personalizacao')
      if(personaliza){
        this._personalizacaoAtiva = JSON.parse(personaliza);
      }
    }
      return this._personalizacaoAtiva

  }
  set personalizacaoAtiva(personalizacao: Personalizacao){
    this._personalizacaoAtiva = personalizacao
  }

  getPersonalizacaoAtiva(){
    return this.http.get<Personalizacao>(path + 'personalizacao/ativa');
  }

  getPersonalizacoes(){
    return this.http.get<Personalizacao[]>(path + 'personalizacao');
  }

  postPersonalizacao(personalizacao: Personalizacao){
    return this.http.post<Personalizacao>(path + 'personalizacao', personalizacao);
  }

  deletePersonalizacao(codigoPersonalizacao: number){
      return this.http.delete(path + 'personalizacao/' + codigoPersonalizacao);
  }

  mudarPersonalizacaoAtiva(codigoPersonalizacao: number){
    return this.http.put<Personalizacao[]>(path + 'personalizacao/ativa/' + codigoPersonalizacao, null);
  }

  constructor(private http: HttpClient) { }
}
