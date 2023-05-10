import { Demanda } from './../models/demanda.model';
import { Filtro } from './../models/filtro.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { FormControl } from '@angular/forms';
import { path } from './path/rota-api';
import { Arquivo } from '../models/arquivo.model';
import { UsuarioService } from './usuario.service';
import { TestScheduler } from 'rxjs/testing';
import { CentroCusto } from '../models/centro-custo.model';
@Injectable({
  providedIn: 'root',
})
export class DemandaService {
  public demandaForm = this.fb.group({
    tituloDemanda: ['', Validators.required],
    situacaoAtualDemanda: [''],
    objetivoDemanda: [''],
    beneficioRealDemanda: this.fb.group({
      moedaBeneficio: [''],
      memoriaDeCalculoBeneficio: [''],
      valorBeneficio: [''],
    }),
    beneficioPotencialDemanda: this.fb.group({
      moedaBeneficio: ['Real'],
      memoriaDeCalculoBeneficio: [''],
      valorBeneficio: [''],
    }),
    beneficioQualitativoDemanda: [''],
    frequenciaDeUsoDemanda: ['', Validators.required],
    codigoDemanda: [''],
    centroCustosDemanda: this.fb.array([this.createCentroCusto(undefined)])

  });

  public get getFormDemandaValid(){
    return this.formEditorEspecial
  }

  public listaArquivosDemanda: EventEmitter<File[]> = new EventEmitter();

  formEditorEspecial = new FormGroup({
    situacaoAtualDemanda: new FormControl('', Validators.required),
    objetivoDemanda: new FormControl('', Validators.required),
    version: new FormControl(0),
  });

  createCentroCusto(cc: CentroCusto | undefined): FormGroup {
    return this.fb.group({
      porcentagemCentroCusto: [cc?.porcentagemCentroCusto || ''],
      nomeCentroCusto: [cc?.nomeCentroCusto || '']
    });
  }

  removeCenterOfCost(index: number) {
    (this.demandaForm.controls.centroCustosDemanda as FormArray).removeAt(index);
  }

  reformularDemanda() {

    this.demandaForm.patchValue({
      situacaoAtualDemanda: this.formEditorEspecial.value.situacaoAtualDemanda,
      objetivoDemanda: this.formEditorEspecial.value.objetivoDemanda,
      // statusDemanda: 'BACKLOG_CLASSIFICACAO'
    })
    let demandaFormData = new FormData();
    this.arquivos.map((item) =>
      demandaFormData.append('arquivos', item, item.name)
    );

    // this.demandaForm.patchValue({ solicitanteDemanda: { codigoUsuario: this.usuarioService.getCodigoUser() } });
    demandaFormData.append('demanda', JSON.stringify(this.demandaForm.value));
    return this.http.put<Demanda | string>(
      path + 'demanda/update',
      demandaFormData
    );
  }


  //função utilizada para pré-definir informações da demanda quando estamos em proposta
  //ou até mesmo em modo rascunho
  setFormDemandaData(demanda: Demanda) {
    if(demanda.centroCustosDemanda)
    for(let i = 0; i < demanda.centroCustosDemanda.length -1; i++){
      this.addCenterOfCost()
    }

    this.demandaForm.patchValue({
      tituloDemanda: demanda.tituloDemanda,
      beneficioRealDemanda: {
        moedaBeneficio: demanda.beneficioRealDemanda?.moedaBeneficio,
        memoriaDeCalculoBeneficio: demanda.beneficioRealDemanda?.memoriaDeCalculoBeneficio,
        valorBeneficio: demanda.beneficioRealDemanda?.valorBeneficio.toString()
      },
      beneficioPotencialDemanda: {
        moedaBeneficio: demanda.beneficioPotencialDemanda?.moedaBeneficio,
        memoriaDeCalculoBeneficio: demanda.beneficioPotencialDemanda?.memoriaDeCalculoBeneficio,
        valorBeneficio: demanda.beneficioPotencialDemanda?.valorBeneficio.toString()
      },
      beneficioQualitativoDemanda: demanda.beneficioQualitativoDemanda,
      frequenciaDeUsoDemanda: demanda.frequenciaDeUsoDemanda,
      centroCustosDemanda: demanda.centroCustosDemanda,
      codigoDemanda: demanda.codigoDemanda, 
    })

   
    
    this.formEditorEspecial.patchValue({
      situacaoAtualDemanda: demanda.situacaoAtualDemanda,
      objetivoDemanda: demanda.objetivoDemanda,
      version: demanda.version
    })
    
    this.listaArquivosDemanda.emit(this.saveByteArrayFile(demanda.arquivosDemanda)) 
  }

  reprovarDemanda(codigoDemanda: number, motivoReprovacao: string) {
    return this.http.put(path + 'demanda/cancell/' + codigoDemanda, motivoReprovacao)
  }
  public addCenterOfCost() {
    (this.demandaForm.controls.centroCustosDemanda as FormArray).push(
      this.createCentroCusto(undefined)
    );

  }
  private filtros: Filtro | undefined

  private arquivos: File[] = [];

  public get getArquivos(){
    return this.arquivos
  }
  public set setArquivos(arq: File[]){
    this.arquivos = arq
  }

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


  //função usada para permitir que o usuário baixe arquivos que vem do backend em base64
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


  //função usada para inserir no p-fileUpload alguns arquivos
  saveByteArrayFile(arquivo: Arquivo[] | undefined) {
    let listToReturn = []
    if (arquivo)
      for (let i of arquivo) {
        const base64 = i.dadosArquivo;
        const binary = atob(base64);
        const len = binary.length;
        const buffer = new ArrayBuffer(len);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < len; i++) {
          view[i] = binary.charCodeAt(i);
        }
        listToReturn.push(new File([view], i.nomeArquivo, { type: i.tipoArquivo }));
      }

    return listToReturn;
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
  private link = ''
  getDemandasFiltradas(pesquisaEspecial: { status: string | undefined, pesquisaCampo: string | undefined } | undefined) {
    if (pesquisaEspecial?.status) {
      this.link = path + `demanda/filtro?solicitante=&codigoDemanda=&status=${pesquisaEspecial.status}&tamanho=&tituloDemanda=&analista=&departamento=&ordenar=${this.filtros?.sort}`
    } else if (pesquisaEspecial?.pesquisaCampo) {
      this.link = path + `demanda/filtro?solicitante=&codigoDemanda=&status=&tamanho=&tituloDemanda=${pesquisaEspecial.pesquisaCampo}&analista=&departamento=&ordenar=${this.filtros?.sort}`
    } else {
      this.link = path + `demanda/filtro?solicitante=${this.filtros?.solicitante}&codigoDemanda=${this.filtros?.codigoDemanda}&status=${this.filtros?.status}&tamanho=${this.filtros?.tamanho}&tituloDemanda=${this.filtros?.tituloDemanda}&analista=${this.filtros?.analista}&departamento=${this.filtros?.departamento}&ordenar=${this.filtros?.sort}`
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
      path + `demanda/filtro/status?status1=${filtros.status1}&status2=${filtros.status2}`
    );
  }
  getHistoricoDemandaByCodigo(codigoDemanda: string) {
    return this.http.get<Demanda[]>(
      path + `demanda/versoes/${codigoDemanda}`
    );
  }

  getDemandas() {
    return this.http.get<Demanda[]>(
      path + 'demanda'
      // 'https://63502d89df22c2af7b65c0d9.mockapi.io/api/demanda'
    );
  }

  getDemandasTelaInicial() {
    return this.http.get<[][]>(
      path + 'demanda/status'
    );
  }

  getDemandaByCodigoDemanda(codigoDemanda: number) {
    return this.http.get<Demanda>(
      path + 'demanda/' + codigoDemanda
    );
  }

  //São feitas algumas inserções no formulário antes de enviar, por conta de tipos de input
  //ou até mesmo o número do código de usuário
  insertsBeforePostDemanda(){
    if (this.demandaForm.value.beneficioPotencialDemanda?.moedaBeneficio == undefined) {
      this.demandaForm.patchValue({
        beneficioPotencialDemanda: { moedaBeneficio: 'Real' }
      })
    }

    if (this.demandaForm.value.beneficioRealDemanda?.moedaBeneficio == undefined) {
      this.demandaForm.patchValue({
        beneficioRealDemanda: { moedaBeneficio: 'Real' }
      })
    }

   
    if(this.formEditorEspecial.value.situacaoAtualDemanda && this.formEditorEspecial.value.objetivoDemanda)
    this.demandaForm.patchValue({
      // solicitanteDemanda: { codigoUsuario: this.usuarioService.getCodigoUser() },
      situacaoAtualDemanda: this.formEditorEspecial.value.situacaoAtualDemanda.replace('<br>', '<br />'),
      objetivoDemanda: this.formEditorEspecial.value.objetivoDemanda.replace('<br>', '<br />')
    })
  }

  postDemanda() {
    //Criando um demandaFormData, onde vamos inserir a demanda, e os arquivos da demanda em conjunto.
    let demandaFormData = new FormData();
    this.arquivos.map((item) =>
      demandaFormData.append('arquivos', item, item.name)
    );
    try {
      this.insertsBeforePostDemanda()
    } catch (err) {
      alert("Ocorreu um erro ao cadastrar: " + err);
    }

    console.log(this.demandaForm.value)
    //Inserindo o form da demanda em si
    
    demandaFormData.append('demanda', JSON.stringify(this.demandaForm.value));

    //Retornando a requisição
    return this.http.post<Demanda | string>(
      path + 'demanda',
      demandaFormData
    );
  }

  avancarStatusDemandaComDecisao(codigoDemanda: string, decisao: number) {

    return this.http.put<any>(
      path + `demanda/update/status/${codigoDemanda}`,
      decisao
    );
  }

  constructor(private http: HttpClient, private fb: FormBuilder, private usuarioService: UsuarioService) {
    
    
    this.listaArquivosDemanda.subscribe(arquivos => {
      console.log("hey")
      this.arquivos = arquivos
    })
   }
}
