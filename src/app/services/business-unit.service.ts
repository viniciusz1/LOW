import { path } from './path/rota-api';
import { BusinessUnit } from './../models/business-unit.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BusinessUnitService {
  getBusinessUnits() {
    return this.http.get<BusinessUnit[]>(path + 'bu');
  }
  constructor(private http: HttpClient) {}
}
