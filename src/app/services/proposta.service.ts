import { path } from './path/rota-api';
import { TipoDespesa } from './../models/tipoDespesa.enum';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { Validators } from '@angular/forms';
import { DemandaService } from './demanda.service';
import { UsuarioService } from './usuario.service';
import { MessageService } from 'primeng/api';

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
    responsavelProposta: [''],
    statusDemanda: ['']
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
  setFormDemandaRascunho(codigoDemanda: number) {
    let i: any = localStorage.getItem('rascunhosProposta')
    let listaRascunho: any[] = JSON.parse(i)
    let proposta =listaRascunho.find(e=> e.codigoDemanda == codigoDemanda)
    console.log(proposta)
    console.log(proposta.prazoProposta)
    if (proposta) {
      this.formProposta.patchValue({
        prazoProposta: proposta.prazoProposta,
        codigoPPMProposta: proposta.codigoPPMProposta,
        jiraProposta: proposta.jiraProposta,
        recursosProposta: proposta.recursosProposta,
        escopoDemandaProposta: proposta.escopoDemandaProposta,
        inicioExDemandaProposta: proposta.inicioExDemandaProposta,
        fimExDemandaProposta: proposta.fimExDemandaProposta,
        paybackProposta: proposta.paybackProposta,
        responsavelProposta: proposta.responsavelProposta,
        statusDemanda:proposta.statusDemanda
      })
    }
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

  get valueDemandaProposta() {
    return Object.assign({}, this.formProposta.value, this.demandaService.demandaForm.value);
  }

  postProposta() {

    let propostaFormData = new FormData();


    try {
      this.showSuccess("Cadastrado!")
      this.demandaService.insertsBeforePostDemanda()
    } catch (err) {
      this.showError("Erro ao cadastrar")
    }
    console.log(this.valueDemandaProposta)

    propostaFormData.append('proposta', JSON.stringify(this.valueDemandaProposta));

    if ( this.demandaService.getArquivos.length != 0) {
      this.demandaService.getArquivos.map((item) =>
        propostaFormData.append('arquivos', item, item.name)
      );
    } else {
      propostaFormData.append('arquivos', new File([], ''));
    }

    return this.http.post<Demanda | string>(
      path + 'proposta',
      propostaFormData
    );
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  constructor(private http: HttpClient, private fb: FormBuilder, private demandaService: DemandaService, private usuarioService: UsuarioService, private messageService: MessageService) {

  }
}
