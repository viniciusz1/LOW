import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reuniao } from '../models/reuniao.model';

@Injectable({
  providedIn: 'root',
})
export class ReuniaoService {
  constructor(private http: HttpClient) {}

//   getComissao() {
//     return this.http.get<Comissao[]>('http://localhost:8080/comissao')
//   }

  getReuniao() {
    return this.http.get<Reuniao[]>('http://localhost:8080/reuniao')
  }

  getReuniaoId(codigoReuniao: Number){
    return this.http.get<Reuniao>('http://localhost:8080/reuniao/' + codigoReuniao)
  }

    postReuniao(reuniao: Reuniao){
      console.log("aqui: ")
        return this.http.post<Reuniao>(
          'http://localhost:8080/reuniao',
          reuniao
        )
    }

  putReuniao(reuniao: Reuniao){
    console.log("aqui: ")
    return this.http.put<Reuniao>(
      'http://localhost:8080/reuniao/update/' + reuniao.codigoReuniao,
      reuniao
    )
  }


}