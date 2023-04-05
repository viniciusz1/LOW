import { path } from './path/rota-api';
import { DemandaClassificadaService } from 'src/app/services/demanda-classificada.service';
import { TipoDespesa } from './../models/tipoDespesa.enum';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { Validators } from '@angular/forms';

interface RecursoDoForm {
  nomeRecurso: string;
  tipoDespesaRecurso: TipoDespesa;
  perfilDespesaRecurso: string;
  quantidadeHorasRecurso: number;
  valorHoraRecurso: number;
  periodoExMesesRecurso: number;
  centroCustos?: { porcentagemCentroCusto: number; nomeCentroCusto: number }[];
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
    responsavelProposta: { 'codigoUsuario': 3 },
    demandaAnalistaProposta: { 'codigoDemandaAnalista': 0 }
  });

  public formRecursos = this.fb.group({
    nomeRecurso: ['', [Validators.required]],
    tipoDespesaRecurso: ['', [Validators.required]],
    perfilDespesaRecurso: ['', [Validators.required]],
    quantidadeHorasRecurso: ['', [Validators.required]],
    valorHoraRecurso: ['', [Validators.required]],
    periodoExMesesRecurso: ['', [Validators.required]],
    centrosCusto: this.fb.array([this.createCentroCusto()])
  });

  createCentroCusto(): FormGroup {
    return this.fb.group({
      porcentagem: [''],
      centroCusto: ['']
    });
  }

  removeCenterOfCost(index: number) {
    (this.formRecursos.controls.centrosCusto as FormArray).removeAt(index);
  }

  addRowRecurso() {

    let porcentagem: number = 0
    if (this.formRecursos.value.centrosCusto)
      for (let i of this.formRecursos.value.centrosCusto) {
        porcentagem += parseInt(i.porcentagem)
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
    (this.formRecursos.controls.centrosCusto as FormArray).push(
      this.createCentroCusto()
    );

  }

  arrumarFormularioParaBackend() {
    this.listaRecursos.forEach(e => {
      e.porcentagemCustoRecurso = [];
      e.centroDeCustoRecurso = [];
      if (e.centroCustos) {
        e.centroCustos.forEach((centro) => {
          e.porcentagemCustoRecurso.push(centro.porcentagemCentroCusto);
          e.centroDeCustoRecurso.push({
            codigoCentroCusto: centro.nomeCentroCusto,
          });
          delete e.centroCustos;
        });
      }
    });
  }



  postProposta(codigoDemandaAnalista: string) {
    this.formProposta.patchValue({
      demandaAnalistaProposta: {
        codigoDemandaAnalista: parseInt(codigoDemandaAnalista)
      }
    })
    console.log(this.formProposta.value);

    this.arrumarFormularioParaBackend();
    return this.http.post<Demanda | string>(
      path + 'proposta',
      this.formProposta.value
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder, private demandaClassificadaService: DemandaClassificadaService) { }
}
