
import { DemandaService } from './../../../../../services/demanda.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CentroCusto } from 'src/app/models/centro-custo.model';
import { Editor, Toolbar } from 'ngx-editor';

interface Tab {
  title: string;
  content: string;
}

@Component({
  selector: 'app-parte-demanda',
  templateUrl: './parte-demanda.component.html',
  styleUrls: ['./parte-demanda.component.scss'],
})
export class ParteDemandaComponent implements OnInit, OnDestroy {
  constructor(
    private demandaService: DemandaService,
  ) { }

  listaFiles: File[] = []
  centroCustos: CentroCusto[] = [];
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

  editor: Editor = new Editor();
  formEditorEspecial = this.demandaService.formEditorEspecial
  toolbarDemanda: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  editorDemanda: Editor = new Editor();
  localMoedaBeneficio1 = 'pt-BR';
  localMoedaBeneficio2 = 'pt-BR';
  currencyMoedaBeneficio1 = 'BRL';
  currencyMoedaBeneficio2 = 'BRL';
  demandaForm = this.demandaService.demandaForm;
  opcoesDeTamanho = [
    'Muito Pequena',
    'Pequena',
    'Média',
    'Grande',
    'Muito Grande',
  ];
  opcoesDeMoeda = [{ name: 'BRL', value: "Real" }, { name: 'EUR', value: "Euro" }, { name: 'DOL', value: "Dollar" }];
  listaCentrodeCusto: number[] = [];
  resultado: boolean = true;
  abrirSegundoAccordion: boolean = false;
  
  tabs1: Tab[] = [
    { title: 'Tab 1', content: 'Conteúdo da Tab 1' },
    { title: 'Tab 2', content: 'Conteúdo da Tab 2' },
    { title: 'Tab 3', content: 'Conteúdo da Tab 3' }
  ];

  activeIndex = 0;

  ngOnInit(): void {
    this.demandaService.listaArquivosDemanda.subscribe(arquivos => {
      this.listaFiles = arquivos
    })
  }

  uploadDocumentos(event: any) {
    this.demandaService.setArquivos = event['files'] as File[];
  }

  removerCentroDeCusto(index: number) {
    this.demandaService.removeCenterOfCost(index);
  }
  adicionarCentroCusto() {
    try {
      this.demandaService.addCenterOfCost();
    } catch (err) {
      alert(err);
    }
  }

  teste() {
    console.log(this.listaFiles)
    console.log(this.demandaForm)
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.editorDemanda.destroy();

  }

  mudouMoeda(event: Event, ordemInput: number) {
    let moeda = event.target as HTMLSelectElement;
    if (moeda.value == 'Real') {
      if (ordemInput == 1) {
        this.localMoedaBeneficio1 = 'pt-BR';
        this.currencyMoedaBeneficio1 = 'BRL';
      } else {
        this.localMoedaBeneficio2 = 'pt-BR';
        this.currencyMoedaBeneficio2 = 'BRL';
      }
    } else if (moeda.value == 'Dollar') {
      if (ordemInput == 1) {
        this.localMoedaBeneficio1 = 'en-US';
        this.currencyMoedaBeneficio1 = 'USD';
      } else {
        this.localMoedaBeneficio2 = 'en-US';
        this.currencyMoedaBeneficio2 = 'USD';
      }
    } else if (moeda.value == 'Euro') {
      if (ordemInput == 1) {
        this.localMoedaBeneficio1 = 'de-DE';
        this.currencyMoedaBeneficio1 = 'EUR';
      } else {
        this.localMoedaBeneficio2 = 'de-DE';
        this.currencyMoedaBeneficio2 = 'EUR';
      }
    }
  }
}
