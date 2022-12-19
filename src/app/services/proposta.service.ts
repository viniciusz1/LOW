import { FormBuilder } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';

@Injectable({
  providedIn: 'root',
})
export class PropostaService {
  public propostaForm = this.fb.group({
  });


  postProposta() {
    return this.http.post<Demanda | string>(
      'http://localhost:8080/demanda',

      this.propostaForm.value
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}
}
