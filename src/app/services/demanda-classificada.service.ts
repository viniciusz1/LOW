
import { FormBuilder, Validators } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { path } from './path/rota-api';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
//A partir do momento em que a demanda tem um analista, ela inicia uma conversa
//Ao analista aceitar iniciar uma demanda, é feita uma requisição setando o analista da mesma
export class DemandaClassificadaService {
  public demandaClassificadaForm = this.fb.group({
    tamanhoDemandaClassificada: ['', Validators.required],
    buSolicitanteDemandaClassificada:['', Validators.required],
    busBeneficiadasDemandaClassificada:['', Validators.required],
    codigoDemanda: [''],
    secaoDemandaClassificada: ['', Validators.required],
  });
  postClassificacaoDemanda(codigoDemanda: string | undefined) {
    if(codigoDemanda != undefined){
    this.demandaClassificadaForm.controls.codigoDemanda.setValue(codigoDemanda);
    }
    return this.http.post<Demanda | string>(
      path + 'demandaClassificada',

      this.demandaClassificadaForm.value
    );
  }
  
  get isFormDemandaClassificadaInvalid(){
    return this.demandaClassificadaForm.invalid;
  }

  constructor(private http: HttpClient, private fb: FormBuilder, private usuarioService: UsuarioService) {}
}
