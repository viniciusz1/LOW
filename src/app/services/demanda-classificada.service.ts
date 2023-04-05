
import { FormBuilder } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { path } from './path/rota-api';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class DemandaClassificadaService {
  public demandaClassificadaForm = this.fb.group({
    tamanhoDemandaClassificada: [''],
    buSolicitanteDemandaClassificada:[''],
    busBeneficiadasDemandaClassificada:[''],
    codigoDemanda: [''],
    analista: { codigoUsuario: this.usuarioService.getCodigoUser() },
    secaoDemandaClassificada: [''],
  });
  postProposta(codigoDemanda: string | undefined) {
    if(codigoDemanda != undefined){
    this.demandaClassificadaForm.controls.codigoDemanda.setValue(codigoDemanda);
    }
    return this.http.post<Demanda | string>(
      path + 'demandaClassificada',

      this.demandaClassificadaForm.value
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder, private usuarioService: UsuarioService) {}
}
