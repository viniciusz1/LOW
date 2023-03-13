import { Demanda } from './../models/demanda.model';
import { Filtro } from './../models/filtro.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { FormControl } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class DemandaService {
  public demandaForm = this.fb.group({
    tituloDemanda: ['', [Validators.required]],
    situacaoAtualDemanda: ['', [Validators.required]],
    objetivoDemanda: ['', [Validators.required]],
    beneficioRealDemanda: this.fb.group({
      moedaBeneficio: [''],
      memoriaDeCalculoBeneficio: [''],
      valorBeneficio: [''],
    }),
    beneficioPotencialDemanda: this.fb.group({
      moedaBeneficio: [''],
      memoriaDeCalculoBeneficio: [''],
      valorBeneficio: [''],
    }),
    beneficioQualitativoDemanda: [''],
    frequenciaDeUsoDemanda: ['', [Validators.required]],
    solicitanteDemanda: {
      codigoUsuario: 2,
    },
    centroCustos: this.fb.array([this.createCentroCusto()])

  });

  formEditorEspecial = new FormGroup({
    situacaoAtualDemanda: new FormControl('', Validators.required),
    objetivoDemanda:new FormControl('', Validators.required),
  });
  createCentroCusto(): FormGroup {
    return this.fb.group({
      porcentagemCentroCusto: [''],
      nomeCentroCusto: ['']
    });
  }
  removeCenterOfCost(index: number) {
    (this.demandaForm.controls.centroCustos as FormArray).removeAt(index);
  }

  setFormDemandaData(demanda: Demanda){
      this.demandaForm.patchValue({
        tituloDemanda: demanda.tituloDemanda,
        beneficioRealDemanda: {
          moedaBeneficio: demanda.beneficioRealDemanda?.moedaBeneficio,
          memoriaDeCalculoBeneficio: demanda.beneficioRealDemanda?.memoriaDeCalculoBeneficio,
          valorBeneficio: demanda.beneficioRealDemanda?.valorBeneficio.toString()
        },
        beneficioPotencialDemanda: {
          moedaBeneficio: demanda.beneficioRealDemanda?.moedaBeneficio,
          memoriaDeCalculoBeneficio: demanda.beneficioRealDemanda?.memoriaDeCalculoBeneficio,
          valorBeneficio: demanda.beneficioRealDemanda?.valorBeneficio.toString()
        },
        beneficioQualitativoDemanda: demanda.beneficioQualitativoDemanda,
        frequenciaDeUsoDemanda: demanda.frequenciaDeUsoDemanda,
        centroCustos: demanda.centroCustos
      })

      this.formEditorEspecial.patchValue({
        situacaoAtualDemanda: demanda.situacaoAtualDemanda,
        objetivoDemanda: demanda.objetivoDemanda
      })
      // this.demandaService.arquivos = this.dadosDemandaAnalista.demandaDemandaAnalista?.arquivosDemanda
    }


  addCenterOfCost() {
    (this.demandaForm.controls.centroCustos as FormArray).push(
      this.createCentroCusto()
    );

  }
  private filtros: Filtro | undefined

  public arquivos: File[] = [];

  public get getFiltroData(): Filtro | undefined {
    return this.filtros
  }

  public set setFiltroData(data: Filtro) {
    this.filtros = data
  }

  avancarPage(page: number) {
    let linkComPaginacao = this.link;
    linkComPaginacao += '&page=' + page
    return this.http.get<Demanda[]>(
      linkComPaginacao
    );
  }


  resetDemandaForm() {
    this.demandaForm.reset();
  }

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
  link = ''
  getDemandasFiltradas(pesquisaEspecial: { status: string | undefined, pesquisaCampo: string | undefined } | undefined) {
    if (pesquisaEspecial?.status) {
      this.link = `http://localhost:8080/demanda/filtro?solicitante=&codigoDemanda=&status=${pesquisaEspecial.status}&tamanho=&tituloDemanda=&analista=&departamento=`
    } else if (pesquisaEspecial?.pesquisaCampo) {
      this.link = `http://localhost:8080/demanda/filtro?solicitante=&codigoDemanda=&status=&tamanho=&tituloDemanda=${pesquisaEspecial.pesquisaCampo}&analista=&departamento=`
    }else{
      this.link = `http://localhost:8080/demanda/filtro?solicitante=${this.filtros?.solicitante}&codigoDemanda=${this.filtros?.codigoDemanda}&status=${this.filtros?.status}&tamanho=${this.filtros?.tamanho}&tituloDemanda=${this.filtros?.tituloDemanda}&analista=${this.filtros?.analista}&departamento=${this.filtros?.departamento}`
    }
    return this.http.get<Demanda[]>(
      this.link
    );
  }

  getTodasAsDemandasFiltradas() {
    let linkParaTodasDemandas = this.link
    linkParaTodasDemandas += '&size=2000'
    console.log(linkParaTodasDemandas)
    return this.http.get<Demanda[]>(
      linkParaTodasDemandas
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
    this.demandaForm.patchValue({
      situacaoAtualDemanda: this.formEditorEspecial.value.situacaoAtualDemanda,
      objetivoDemanda: this.formEditorEspecial.value.objetivoDemanda
    })
    console.log(this.demandaForm.value)

    let demandaFormData = new FormData();

    this.arquivos.map((item) =>
      demandaFormData.append('arquivos', item, item.name)
    );
    this.demandaForm.patchValue({ solicitanteDemanda: { codigoUsuario: 3 } });
    demandaFormData.append('demanda', JSON.stringify(this.demandaForm.value));
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

  constructor(private http: HttpClient, private fb: FormBuilder) { }
}
