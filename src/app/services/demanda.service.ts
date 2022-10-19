
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';

@Injectable({
    providedIn: 'root'
  })
  export class DemandaService {

    getDemandas(){
      return this.http.get<Demanda[]>('https://63502d89df22c2af7b65c0d9.mockapi.io/api/demanda')
    }

    constructor(private http: HttpClient) { }
  }