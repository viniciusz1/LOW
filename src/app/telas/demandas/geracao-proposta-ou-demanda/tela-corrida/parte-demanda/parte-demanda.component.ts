
import { DemandaService } from './../../../../../services/demanda.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CentroCusto } from 'src/app/models/centro-custo.model';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { TelaCorridaComponent } from '../tela-corrida.component';

@Component({
  selector: 'app-parte-demanda',
  templateUrl: './parte-demanda.component.html',
  styleUrls: ['./parte-demanda.component.scss'],
})
export class ParteDemandaComponent implements OnInit, OnDestroy {
  constructor(
    private demandaService: DemandaService,
  ) {}

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
  opcoesDeMoeda = [{ name: 'BRL' }, { name: 'EUR' }, { name: 'DOL' }];
  listaCentrodeCusto: number[] = [];
  resultado: boolean = true;

  ngOnInit(): void {
  }

  uploadDocumentos(event: any) {
    this.demandaService.arquivos = event['files'] as File[];
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
    console.log(this.formEditorEspecial.value)
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
