import { Secao } from '../models/secao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SecaoService {
  constructor(private http: HttpClient) {}

  getSecao() {
    return this.http.get<Secao[]>('http://localhost:8080/secao')
  }
}
