import { VoiceRecognitionService } from './../../../../../services/voice-recognition.service';
import { ActivatedRoute } from '@angular/router';
import { RascunhoService } from './../../../../../services/rascunho.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DemandaService } from './../../../../../services/demanda.service';
import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ElementRef } from '@angular/core';
import { CentroCusto } from 'src/app/models/centro-custo.model';
import { Editor, NgxEditorComponent, Toolbar } from 'ngx-editor';
import { MessageService } from 'primeng/api';

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
    private rascunhoService: RascunhoService,
    private route: ActivatedRoute,
    public voiceRecognitionService: VoiceRecognitionService,
    private messageService: MessageService
  ) {

    let indiceRascunho = route.snapshot.params['indiceRascunho']
    this.inputSubject.pipe(debounceTime(500)).subscribe(() => {
      if (route.snapshot.url) {
        if (indiceRascunho) {
          rascunhoService.atualizarRascunhoDemanda = indiceRascunho
        }
      }
    });
  }

  startVoice() {
    this.voiceRecognitionService.start();
  }

  stopService() {
    this.voiceRecognitionService.stop()
  }

  onFocoIn(nomeEditorEmFoco: string) {
    this.editorEspecialEmFoco = nomeEditorEmFoco;
    this.voiceRecognitionService.setInputEmFoco('string')
  }

  onFocoOut() {
    this.editorEspecialEmFoco = "";
    this.voiceRecognitionService.setInputEmFoco(null)
  }

  //serve para setar o tipo do editor de texto como html por padrão
  //NÃO DELETAR
  editorEspecialEmFoco: string = "";
  htmlSituacaoAtual = ""
  htmlObjetivo = ""

  onInputChange() {
    // Em vez de chamar diretamente o método, envie um evento ao Subject
    this.inputSubject.next('aaaA');
  }

  inputSubject = new Subject<string>();
  @Input() aparecerProposta = false;

  index: number = 0;
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
  campoEntrada: string = '';
  demandaForm = this.demandaService.demandaForm;
  opcoesDeTamanho = [
    'Muito Pequena',
    'Pequena',
    'Média',
    'Grande',
    'Muito Grande',
  ];
  porcentagem: number = 0
  porcentagem100: boolean = false;
  opcoesDeMoeda = [{ name: 'BRL', value: "Real" }, { name: 'EUR', value: "Euro" }, { name: 'DOL', value: "Dollar" }];
  moedaSelecionada: any = { name: 'BRL', value: 'Real' };
  moedaSelecionada2: any = { name: 'BRL', value: 'Real' };
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

    this.voiceRecognitionService.$novasPalavrasFaladas.subscribe(palavra => {
      if(this.editorEspecialEmFoco == 'objetivo'){
        this.htmlObjetivo = palavra
      }else if(this.editorEspecialEmFoco == 'situacao'){
        this.htmlSituacaoAtual += palavra
      }


    })
  }

  uploadDocumentos(event: any) {
    if (!this.isBiggerThan100MB(event['files'] as File[])) {
      this.demandaService.setArquivos = event['files'] as File[];
    } else {
      this.listaFiles = []
      this.showError("O tamanho total dos arquivos não pode ser maior que 100MB")
    }

  }

  isBiggerThan100MB(files: File[]): boolean {
    let totalSize = 0;
    for (const file of files) {
      totalSize += file.size;
    }
    // Convertendo para megabytes
    const totalSizeInMB = totalSize / (1024 * 1024);

    return totalSizeInMB > 100;
  }
  removerCentroDeCusto(index: number) {
    this.demandaService.removeCenterOfCost(index);
    if (this.demandaForm.value.centroCustosDemanda) {
      this.porcentagem = 0;
      for (let i = 0; i < this.demandaForm.value.centroCustosDemanda.length; i++) {
        this.porcentagem += parseInt(this.demandaForm.value.centroCustosDemanda[i].porcentagemCentroCusto)
        console.log("Ta entrando sim ", this.porcentagem)
      }
    }

    if (this.porcentagem < 100) {
      this.porcentagem100 = false;
    } else if (this.porcentagem > 100) {
      this.showError("Sua porcentagem ainda está acima de 100")
    }
  }
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  adicionarCentroCusto() {
    try {
      if (this.demandaForm.value.centroCustosDemanda) {
        this.porcentagem = 0;
        for (let i = 0; i < this.demandaForm.value.centroCustosDemanda.length; i++) {
          this.porcentagem += parseInt(this.demandaForm.value.centroCustosDemanda[i].porcentagemCentroCusto)
          console.log("Ta entrando sim ", this.porcentagem)
        }
      }

      if (this.porcentagem < 100) {
        this.porcentagem100 = false;
      }

      if (this.porcentagem == 100) {
        this.porcentagem100 = true;
      }

      if (this.porcentagem > 100) {
        this.porcentagem100 = true;
        if (this.demandaForm.value.centroCustosDemanda?.length) {
          this.removerCentroDeCusto(this.demandaForm.value.centroCustosDemanda.length - 1)
        }
        this.showError("A porcentagem ultrapassou os 100%")
      }

      if (!this.porcentagem100) {
        this.demandaService.addCenterOfCost();
      }
    } catch (err) {
      this.showError("Não foi possível adicionar centro de custo!")
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

  mudouMoeda(event: any, ordemInput: number) {
    this.onInputChange()

    let moeda = event;
    console.log(moeda)

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
