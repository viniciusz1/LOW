import { FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { Validators } from '@angular/forms';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class DemandaService {
  public demandaForm = this.fb.group({
    tituloDemanda: ['', [Validators.required]],
    situacaoAtualDemanda: ['', [Validators.required]],
    objetivoDemanda: ['', [Validators.required]],
    centroCustos: ['', [Validators.required]],
    beneficioRealDemanda: this.fb.group({
      moedaBeneficio: ['', [Validators.required]],
      memoriaDeCalculoBeneficio: ['', [Validators.required]],
      valorBeneficio: ['', [Validators.required]],
    }),
    beneficioPotencialDemanda: this.fb.group({
      moedaBeneficio: ['', [Validators.required]],
      memoriaDeCalculoBeneficio: ['', [Validators.required]],
      valorBeneficio: ['', [Validators.required]],
    }),
    beneficioQualitativoDemanda: ['', [Validators.required]],
    frequenciaDeUsoDemanda: ['', [Validators.required]],
    solicitanteDemanda: {
      codigoUsuario: 2,
    },
  });

  resetDemandaForm() {
    this.demandaForm.reset();
  }

  public arquivos: File[] = [];

  saveByteArray(bytes: string, type: string, name: string) {
    const base64 = bytes;
    const binary = atob(base64);
    const len = binary.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([view], { type: type });
    saveAs(blob, name);
  }
  getBeneficioReal(): number {
    if (this.demandaForm.value.beneficioRealDemanda?.valorBeneficio) {
      return parseInt(
        this.demandaForm.value.beneficioRealDemanda?.valorBeneficio
      );
    }
    return 0;
  }

  getBeneficioPotencial() {
    if (this.demandaForm.value.beneficioPotencialDemanda?.valorBeneficio) {
      return parseInt(this.demandaForm.value.beneficioPotencialDemanda?.valorBeneficio);
    }
    return 0;
  }

  getDemandasFiltradas(filtros: {
    solicitante: string;
    codigoDemanda: string;
    status: string;
    tamanho: string;
    tituloDemanda: string;
    analista: string;
    departamento: string;
  }) {
    return this.http.get<Demanda[]>(
      `http://localhost:8080/demanda/filtro?solicitante=${filtros.solicitante}&codigoDemanda=${filtros.codigoDemanda}&status=${filtros.status}&tamanho=${filtros.tamanho}&tituloDemanda=${filtros.tituloDemanda}&analista=${filtros.analista}&departamento=${filtros.departamento}`
    );
  }

  getDemandasFiltradasStatus(filtros: { status1: string; status2: string }) {
    return this.http.get<Demanda[]>(
      `http://localhost:8080/demanda/filtro/status?status1=${filtros.status1}&status2=${filtros.status2}`
    );
  }

  getDemandas() {
    return this.http.get<Demanda[]>(
      'http://localhost:8080/demanda'
      // 'https://63502d89df22c2af7b65c0d9.mockapi.io/api/demanda'
    );
  }

  getDemandasTelaInicial() {
    return this.http.get<[][]>(
      // 'http://localhost:8080/demanda'
      'http://localhost:8080/demanda/status'
    );
  }

  getDemandaByCodigoDemanda(codigoDemanda: number) {
    return this.http.get<Demanda>(
      'http://localhost:8080/demanda/' + codigoDemanda
    );
  }

  formatarStatusDemanda(demandas: Demanda[]) {
    for (let i of demandas) {
    }
  }
  postDemanda() {
    let demandaFormData = new FormData();

    this.arquivos.map((item) =>
      demandaFormData.append('arquivos', item, item.name)
    );
    this.demandaForm.patchValue({ solicitanteDemanda: { codigoUsuario: 2 } });
    demandaFormData.append('demanda', JSON.stringify(this.demandaForm.value));
    console.log(this.demandaForm.value);
    return this.http.post<Demanda | string>(
      'http://localhost:8080/demanda',
      demandaFormData
    );
  }

  avancarStatusDemandaComDecisao(codigoDemanda: string, decisao: number) {
    return this.http.put<any>(
      `http://localhost:8080/demanda/update/status/${codigoDemanda}`,
      decisao
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {}
}
