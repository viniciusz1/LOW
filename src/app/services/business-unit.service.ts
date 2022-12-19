import { BusinessUnit } from './../models/business-unit.model';
import { FormBuilder } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { StatusDemanda } from '../models/statusDemanda.enum';

@Injectable({
  providedIn: 'root',
})
export class BusinessUnitService {
  getBusinessUnits() {
    return this.http.get<BusinessUnit[]>('http://localhost:8080/bu');
  }
  constructor(private http: HttpClient) {}
}
