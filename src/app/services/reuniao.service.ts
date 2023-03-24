import { path } from './path/rota-api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reuniao } from '../models/reuniao.model';

@Injectable({
  providedIn: 'root',
})
export class ReuniaoService {
  constructor(private http: HttpClient) {}

  getReuniao() {
    return this.http.get<Reuniao[]>(path + 'reuniao');
  }

  getReuniaoId(codigoReuniao: Number) {
    return this.http.get<Reuniao>(
      path + 'reuniao/' + codigoReuniao
    );
  }

  postReuniao(reuniao: Reuniao) {
    return this.http.post<Reuniao>(path + 'reuniao', reuniao);
  }

  enviarParecerComissao(info: {parecerComissaoProposta: string, decisaoProposta: string, recomendacaoProposta: string}, codigoProposta: string){
    return this.http.put(path + 'reuniao/parecer/' + codigoProposta, info)
  }

  getReuniaoFiltrada(filtros: {
    nomeComissao: string;
    dataReuniao: string;
    statusReuniao: string;
    ppmProposta: string;
    analista: string;
    solicitante: string;
    page: string;
    size: string;
  } ) {
    return this.http.get<Reuniao[]>(
      path + `reuniao/filtro?nomeComissao=${filtros.nomeComissao}&dataReuniao=${filtros.dataReuniao}&statusReuniao=${filtros.statusReuniao}&ppmProposta=${filtros.ppmProposta}&analista=${filtros.analista}&solicitante=${filtros.solicitante}`
    );
  }
  putReuniao(reuniao: Reuniao) {
    console.log('aqui: ');
    return this.http.put<Reuniao>(
      path + 'reuniao/update/' + reuniao.codigoReuniao,
      reuniao
    );
  }
}
