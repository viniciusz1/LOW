import { DemandaService } from 'src/app/services/demanda.service';
import { Router } from '@angular/router';
import { Recurso } from './../../../../models/recurso.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { MessageService, SelectItem } from 'primeng/api';
import { TipoDespesa } from 'src/app/models/tipoDespesa.enum';
import { ScrollSpyService } from 'ng-spy';

interface Responsavel {
  nome: string;
  area: string;
}

interface CentrosCusto {
  centro: string;
}

interface Moedas {
  abreviacao: string;
}

@Component({
  selector: 'app-tela-corrida',
  templateUrl: './tela-corrida.component.html',
  styleUrls: ['./tela-corrida.component.scss'],
})
export class TelaCorridaComponent implements OnInit {
  demandaForm = this.fb.group({
    tituloDemanda: [''],
    situacaoAtualDemanda: [''],
    objetivoDemanda: [''],
    centroCustoDemanda: [''],
    beneficioRealDemanda: this.fb.group({
      moeda: [''],
      memoriaCalculo: [''],
      valor: [''],
    }),
    beneficioPotencialDemanda: this.fb.group({
      moeda: [''],
      memoriaCalculo: [''],
      valor: [''],
    }),
    beneficioQualitativoDemanda: [''],
    frequenciaDeUsoDemanda: [''],

    solicitanteDemanda: ['Por localStorage']
  });

  onSubmitDemanda() {
    //ARQUIVO -- NÃO FUNCIONA
    // this.demandaForm.patchValue({
    //   anexoDemanda: JSON.stringify(this.arquivos),
    // });
    this.demandaService.postDemanda(this.demandaForm.value).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (err) => {
          console.error(err)
        }
      })
  }
  arquivos: File[] = [];
  arquivosUpload(event: any) {
    console.log(event);
    this.arquivos = event.currentFiles;
  }

  constructor(
    private messageService: MessageService,
    private spyService: ScrollSpyService,
    private router: Router,
    private fb: FormBuilder,
    private demandaService: DemandaService
  ) {
    this.tipoExibicaoTela();
  }

  inicioData: Date | any;
  fimData: Date | undefined = undefined;
  payback: number = 0;
  selectedCoin: any;
  activeTarget: string = '';
  clonedRecursos: { [s: string]: Recurso } = {};
  editor: Editor = new Editor();
  aparecerProposta = false;
  uploadedFiles: any[] = [];
  selectedCentros: any;
  selectedResponsaveis: any;
  opcoesDeTamanho = [
    { name: 'Muito Pequena' },
    { name: 'Pequena' },
    { name: 'Média' },
    { name: 'Grande' },
    { name: 'Muito Grande' },
  ];
  recursos: Recurso[] = [
    {
      id: '1',
      nomeRecurso: 'Recurso 1',
      tipoDespesa: TipoDespesa.EXTERNO,
      perfilDespesa: 'Perfil 1',
      quantidadeHoras: 1,
      valorHora: 1,
      valorTotalDespesa: 1,
      periodoExMeses: 1,
      centrosCustoPagantes: [],
    },
  ];
  statuses: SelectItem[] = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' },
  ];
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  moedas: Moedas[] = [
    { abreviacao: 'BRL' },
    { abreviacao: 'EUR' },
    { abreviacao: 'USD' },
  ];
  centrosCusto: CentrosCusto[] = [
    { centro: 'Weg 1' },
    { centro: 'Weg 2' },
    { centro: 'Weg 3' },
  ];
  Responsaveis: Responsavel[] = [
    { nome: 'Otavio Neves', area: 'WEG Digital' },
    { nome: 'Vinicius Bonatti', area: 'Vendas' },
    { nome: 'Camilly Vitoria', area: 'Motores' },
    { nome: 'Kenzo Hedeaky', area: 'Trefilação' },
    { nome: 'Felipe Viera', area: 'Corpotativo' },
  ];
  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  setActiveTarget(targetName: string) {
    this.activeTarget = targetName;
  }

  onRowEditInit(product: Recurso) {
    this.clonedRecursos[product.id] = { ...product };
  }

  onRowEditSave(product: Recurso) {
    delete this.clonedRecursos[product.id];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Recurso is updated',
    });
  }

  onRowEditCancel(product: Recurso, index: number) {
    this.recursos[index] = this.clonedRecursos[product.id];
    delete this.clonedRecursos[product.id];
  }

  tipoExibicaoTela() {
    if (this.router.url == '/tela-inicial/demanda') {
      this.aparecerProposta = false;
    } else {
      this.aparecerProposta = true;
    }
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
