import { Comissao } from './../models/comissao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComissaoService {
  constructor(private http: HttpClient) {}

  getComissao() {
    return this.http.get<Comissao[]>('http://localhost:8080/comissao')
  }
}
