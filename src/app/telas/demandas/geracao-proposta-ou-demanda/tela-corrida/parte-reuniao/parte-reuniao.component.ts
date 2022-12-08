import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ScrollSpyService } from 'ng-spy';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { MessageService } from 'primeng/api';
import { Recurso } from 'src/app/models/recurso.model';
import { TipoDespesa } from 'src/app/models/tipoDespesa.enum';

interface Responsavel {
  nome: string,
  area: string
}
@Component({
  selector: 'app-parte-reuniao',
  templateUrl: './parte-reuniao.component.html',
  styleUrls: ['./parte-reuniao.component.scss']
})
export class ParteReuniaoComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private spyService: ScrollSpyService,
    private fb: FormBuilder) {
    // spyService.addTarget(target: 'reuniao', offset: 0)
  }
  formProposta = this.fb.group({
    
  })
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
  responsaveis: Responsavel[] = [
    { nome: 'Otavio Neves', area: 'WEG Digital' },
    { nome: 'Vinicius Bonatti', area: 'Vendas' },
    { nome: 'Camilly Vitoria', area: 'Motores' },
    { nome: 'Kenzo Hedeaky', area: 'Trefilação' },
    { nome: 'Felipe Viera', area: 'Corpotativo' }
  ];

  selectedResponsaveis: any;
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  formEditor = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });
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
  inicioData: Date | any;
  fimData: Date | undefined = undefined;
  payback: number = 0;
  selectedCoin: any;
  clonedRecursos: { [s: string]: Recurso } = {};

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

  ngOnInit(): void {
  }

}
