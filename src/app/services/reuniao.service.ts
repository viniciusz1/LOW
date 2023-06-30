import { path } from './path/rota-api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reuniao } from '../models/reuniao.model';
import { Demanda } from '../models/demanda.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReuniaoService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getReuniao() {
    return this.http.get<Reuniao[]>(path + 'reuniao');
  }

  getReuniaoId(codigoReuniao: Number) {
    return this.http.get<Reuniao>(path + 'reuniao/' + codigoReuniao);
  }

  cancelarReuniao(codigoReuniao: number | undefined, motivoReuniao: string) {
    return this.http.put<Reuniao>(
      path + 'reuniao/cancelar/' + codigoReuniao,
      motivoReuniao
    );
  }

  finalizarReuniao(codigoReuniao: number | undefined) {
    return this.http.put<Reuniao>(
      path + 'reuniao/finalizar/' + codigoReuniao,
      null
    );
  }

  postReuniao(reuniao: Reuniao) {
    return this.http.post<Reuniao>(path + 'reuniao', reuniao);
  }

  enviarParecerDG(){
    
  }

  enviarParecerComissao(
    codigoReuniao: number | undefined,
    info: {
      tipoAtaProposta: string;
      parecerComissaoProposta: string;
      decisaoProposta: string;
      recomendacaoProposta: string;
    },
    codigoProposta: string
  ) {
    return this.http.put<Demanda>(
      path +
        'reuniao/parecer/' +
        codigoProposta +
        '?codigoReuniao=' +
        codigoReuniao,
      info
    );
  }

  addInfoDG(arquivo: File, codigoReuniao: number, codigoAtaDG: string) {
    let formData = new FormData();
    formData.append('arquivo', arquivo);
    formData.append('numAtaDG', codigoAtaDG);
    return this.http.put<Reuniao>(
      path + 'reuniao/parecer-dg/' + codigoReuniao,
      formData
    );
  }

  infosFiltro: {
    nomeComissao: string;
    dataReuniao: string;
    statusReuniao: string;
    ppmProposta: string;
    analista: string;
    solicitante: string;
    ordenar: string;
    page: string;
    size: string;
  } = {
    nomeComissao: '',
    dataReuniao: '',
    statusReuniao: '',
    ppmProposta: '',
    analista: '',
    solicitante: '',
    ordenar: '',
    page: '',
    size: '',
  };

  filtroOrdenado = false;
  pageable: any;
  link: string =
    path +
    `reuniao/filtro?nomeComissao=&dataReuniao=&statusReuniao=&ppmProposta=&analista=&solicitante=&ordenar=`;
  get totalPages() {
    return this.pageable.totalPages || 0;
  }

  avancarPage(page: number) {
    let linkComPaginacao = this.link;
    linkComPaginacao += '&page=' + page;
    return this.http.get<Demanda[]>(linkComPaginacao).pipe(
      map((pageable: any) => {
        this.pageable = pageable;
        return pageable.content;
      })
    );
  }

  getReuniaoFiltrada(
    filtros: {
      nomeComissao: string;
      dataReuniao: string;
      statusReuniao: string;
      ppmProposta: string;
      analista: string;
      solicitante: string;
      ordenar: string;
      page: string;
      size: string;
    } ) {

      // console.log(filtros.dataReuniao)
      // if(dataReuniao)
      // console.log(filtros.statusReuniao)

    if (filtros.ordenar != '') {
      console.log(filtros.ordenar);
      this.infosFiltro.ordenar = filtros.ordenar;
      filtros = this.infosFiltro;
      this.filtroOrdenado = true;
    } else {
      this.filtroOrdenado = false;
    }
    this.infosFiltro = filtros;
    this.link =
      path +
      `reuniao/filtro?nomeComissao=${filtros.nomeComissao}&dataReuniao=${filtros.dataReuniao}&statusReuniao=${filtros.statusReuniao}&ppmProposta=${filtros.ppmProposta}&analista=${filtros.analista}&solicitante=${filtros.solicitante}&ordenar=${filtros.ordenar}`;
    console.log(this.link);
    return this.http.get<Reuniao[]>(this.link).pipe(
      map((pageable: any) => {
        this.pageable = pageable;
        return pageable.content;
      })
    );
  }

  putReuniao(reuniao: Reuniao) {
    this.route.url.subscribe((url) => {
      console.log(url);
    });
    return this.http.put<Reuniao>(
      path + 'reuniao/update/' + reuniao.codigoReuniao,
      reuniao
    );
  }
}
