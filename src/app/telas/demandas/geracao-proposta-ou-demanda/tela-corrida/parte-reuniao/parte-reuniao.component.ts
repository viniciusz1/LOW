import { CentroCustoService } from './../../../../../services/centro-custo.service';
import { CentroCusto } from './../../../../../models/centro-custo.model';
import { PropostaService } from './../../../../../services/proposta.service';
import { DemandaAnalistaService } from './../../../../../services/demanda-analista.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ScrollSpyService } from 'ng-spy';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { MessageService } from 'primeng/api';
import { Recurso } from 'src/app/models/recurso.model';
import { TipoDespesa } from 'src/app/models/tipoDespesa.enum';

interface Responsavel {
  nome: string;
  area: string;
}
@Component({
  selector: 'app-parte-reuniao',
  templateUrl: './parte-reuniao.component.html',
  styleUrls: ['./parte-reuniao.component.scss'],
})
export class ParteReuniaoComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private propostaService: PropostaService,
    private centroCustoService: CentroCustoService
  ) {
    // spyService.addTarget(target: 'reuniao', offset: 0)
  }
  @Input() centrosCusto: CentroCusto[] = [];
  formProposta = this.propostaService.formProposta;
  recursos = this.propostaService.formRecursos;
  listaRecursos = this.propostaService.listaRecursos;
  responsaveis: Responsavel[] = [
    { nome: 'Otavio Neves', area: 'WEG Digital' },
    { nome: 'Vinicius Bonatti', area: 'Vendas' },
    { nome: 'Camilly Vitoria', area: 'Motores' },
    { nome: 'Kenzo Hedeaky', area: 'Trefilação' },
    { nome: 'Felipe Viera', area: 'Corpotativo' },
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
  selectedCoin: any;
  clonedRecursos: { [s: string]: Recurso } = {};
  tipoDaDespesa = [{ tipo: 'Interna' }, { tipo: 'Externa' }];

  onSubmit() {
    console.log(this.formProposta.value);
  }

  porcentagemCC: [{ porcentagem: string; index: number }] = [
    { porcentagem: '', index: 0 },
  ];
  quantidadeCC = [0];
  costCenters = [ 'Center 1', 'Center 2', 'Center 3' ];

  //fazer verificações necessárias
  addRowRecurso() {
    this.listaRecursos.push(this.recursos.value as unknown as Recurso);
  }
  adicionarCentroCusto(){
    this.propostaService.addCenterOfCost()
  }

 

  teste: string[] = []
  atualizarCentrosCusto() {
    this.centroCustoService.getCentrosCusto().subscribe({
      next: (centrosCusto) => {
        this.centrosCusto = centrosCusto;
      },
      error: (err) => console.log(err),
    });
  }
  ngOnInit(): void {
    this.atualizarCentrosCusto();
  }
}
