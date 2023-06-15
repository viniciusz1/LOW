import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { path } from './path/rota-api';


@Injectable({
  providedIn: 'root'
})
export class PersonalizacaoService {
  getPersonalizacaoAtiva(){
    return this.http.get(path + 'personalizacao/ativa');
  }

  getPersonalizacoes(){
    return this.http.get(path + 'personalizacao');
  }

  postPersonalizacaoAtiva(personalizacao: any){
    return this.http.post(path + 'personalizacao', personalizacao);
  }

  deletePersonalizacao(codigoPersonalizacao: number){
      return this.http.delete(path + 'personalizacao/' + codigoPersonalizacao);
  }

  mudarPersonalizacaoAtiva(codigoPersonalizacao: number){
    return this.http.put(path + 'personalizacao/' + codigoPersonalizacao, null);
  }

  constructor(private http: HttpClient) { }
}
