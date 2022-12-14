import { CentroCusto } from './../models/centro-custo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CentroCustoService {
  constructor(private http: HttpClient) { }
  getCentrosCusto() {
    return this.http.get<CentroCusto[]>('http://localhost:8080/centro-custo')
  }
}
