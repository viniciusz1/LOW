import { path } from './path/rota-api';
import { DemandaClassificadaService } from 'src/app/services/demanda-classificada.service';
import { TipoDespesa } from './../models/tipoDespesa.enum';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { Validators } from '@angular/forms';
import { DemandaService } from './demanda.service';
import { UsuarioService } from './usuario.service';

interface RecursoDoForm {
  nomeRecurso: string;
  tipoDespesaRecurso: TipoDespesa;
  perfilDespesaRecurso: string;
  quantidadeHorasRecurso: number;
  valorHoraRecurso: number;
  periodoExMesesRecurso: number;
  centroCustoRecurso?: { porcentagemCentroCusto: number; nomeCentroCusto: number }[];
  porcentagemCustoRecurso: number[];
  centroDeCustoRecurso: { codigoCentroCusto: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class PropostaService {
  public listaRecursos: RecursoDoForm[] = []


  public paybackProposta: number = 0;
  public formProposta = this.fb.group({
    prazoProposta: ['', [Validators.required]],
    codigoPPMProposta: ['', [Validators.required]],
    jiraProposta: ['', [Validators.required]],
    recursosProposta: [this.listaRecursos, [Validators.required]],
    escopoDemandaProposta: ['', [Validators.required]],
    inicioExDemandaProposta: ['', [Validators.required]],
    fimExDemandaProposta: ['', [Validators.required]],
    paybackProposta: [this.paybackProposta],
    responsavelProposta: { 'codigoUsuario': 0 },
  });

  public formRecursos = this.fb.group({
    nomeRecurso: ['', [Validators.required]],
    tipoDespesaRecurso: ['', [Validators.required]],
    perfilDespesaRecurso: ['', [Validators.required]],
    quantidadeHorasRecurso: ['', [Validators.required]],
    valorHoraRecurso: ['', [Validators.required]],
    periodoExMesesRecurso: ['', [Validators.required]],
    centroCustoRecurso: this.fb.array([this.createCentroCusto()])
  });

  createCentroCusto(): FormGroup {
    return this.fb.group({
      porcentagemCentroCusto: [''],
      nomeCentroCusto: ['']
    });
  }

  removeCenterOfCost(index: number) {
    (this.formRecursos.controls.centroCustoRecurso as FormArray).removeAt(index);
  }

  addRowRecurso() {

    let porcentagem: number = 0
    if (this.formRecursos.value.centroCustoRecurso)
      for (let i of this.formRecursos.value.centroCustoRecurso) {
        porcentagem += parseInt(i.porcentagemCentroCusto)
      }
    if (porcentagem == 100) {
      if (this.formRecursos.valid) {
        this.listaRecursos.push(this.formRecursos.value as unknown as RecursoDoForm);
        this.formRecursos.reset()
      }
    } else {
      throw new Error("A porcentagem dos centros de custo devem fechar 100%")
    }

  }


  addCenterOfCost() {
    (this.formRecursos.controls.centroCustoRecurso as FormArray).push(
      this.createCentroCusto()
    );

  }



  postProposta() {

    let propostaFormData = new FormData();

    this.formProposta.patchValue({
      responsavelProposta: { 'codigoUsuario': this.usuarioService.getCodigoUser() }
    })


    try {
      this.demandaService.insertsBeforePostDemanda()
    } catch (err) {
      alert("Ocorreu um erro ao cadastrar: " + err);
    }
    
    const demandaEPropostaJuntos = Object.assign({}, this.formProposta.value, this.demandaService.demandaForm.value);
    propostaFormData.append('proposta', JSON.stringify(demandaEPropostaJuntos));

    console.log(demandaEPropostaJuntos)
    this.demandaService.getArquivos.map((item) =>
      propostaFormData.append('arquivos', item, item.name)
    );


    return this.http.post<Demanda | string>(
      path + 'proposta',
      propostaFormData
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder, private demandaService: DemandaService, private usuarioService: UsuarioService) {

  }
}
