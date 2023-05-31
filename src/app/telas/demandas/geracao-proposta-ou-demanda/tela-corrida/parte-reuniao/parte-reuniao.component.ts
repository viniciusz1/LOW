import { DemandaService } from 'src/app/services/demanda.service';
import { CentroCusto } from './../../../../../models/centro-custo.model';
import { PropostaService } from './../../../../../services/proposta.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { Recurso } from 'src/app/models/recurso.model';
import { Subject, debounceTime } from 'rxjs';
import { RascunhoService } from 'src/app/services/rascunho.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

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
    private propostaService: PropostaService,
    private demandaService: DemandaService,
    private rascunhoService: RascunhoService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {

    this.inputSubject.pipe(debounceTime(500)).subscribe(() => {
      rascunhoService.atualizarRascunhoProposta = this.route.snapshot.params['codigoDemanda']
    });
  }

  onInputChange() {
    console.log("change", this.inputSubject.next)
    this.inputSubject.next("");
  }

  onInputChangeDate(newValue: Date) {
   // Use o valor atualizado conforme necessário
    this.inicioData = newValue;
  }

  inputSubject = new Subject<string>();
  custosTotais: number = 0;
  paybackProposta = this.propostaService.paybackProposta;
  centroCustos: CentroCusto[] = [];
  formProposta = this.propostaService.formProposta;
  formRecursos = this.propostaService.formRecursos;
  listaRecursos = this.propostaService.listaRecursos;

  statusDemanda = [
    {
      name: 'Business Case',
      value: 'BUSINESS_CASE'
    },
    {
      name: 'Assessment',
      value: 'ASSESSMENT'
    }
  ]

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
  dataAtual: Date = new Date();
  clonedRecursos: { [s: string]: Recurso } = {};
  tipoDaDespesa = [{ tipo: 'Interna', value: 'interno' }, { tipo: 'Externa', value: 'externo' }];
  perfilDaDespesa = [{ tipo: 'Hardware', value: 'hardware' }, { tipo: 'Software', value: 'software' }, { tipo: 'Corporativo', value: 'corporativo' }];

  onSubmit() {
    // console.log(this.formProposta.value);
  }
  porcentagemCC: [{ porcentagem: string; index: number }] = [
    { porcentagem: '', index: 0 },
  ];
  quantidadeCC = [0];
  centrosDeCustoOpcoes = ['Center 1', 'Center 2', 'Center 3'];
  //fazer verificações necessárias
  addRowRecurso() {
    try {
      this.propostaService.addRowRecurso()
      this.mudarCustoTotalProjetoEPayback()
    } catch (err) {
      this.showError("Não foi possível adicionar recurso")
    }
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


  mudarCustoTotalProjetoEPayback() {
    this.custosTotais = 0
    this.listaRecursos.forEach(recurso => {
      this.custosTotais += recurso.valorHoraRecurso * recurso.quantidadeHorasRecurso;
    })
    this.paybackProposta = this.custosTotais / (this.demandaService.getBeneficioReal() + this.demandaService.getBeneficioPotencial());
  }

  editarRecurso(index: number) {
    this.formRecursos.patchValue({
      nomeRecurso: this.listaRecursos[index].nomeRecurso,
      tipoDespesaRecurso: this.listaRecursos[index].tipoDespesaRecurso,
      perfilDespesaRecurso: this.listaRecursos[index].perfilDespesaRecurso,
      valorHoraRecurso: this.listaRecursos[index].valorHoraRecurso.toString(),
      quantidadeHorasRecurso: this.listaRecursos[index].quantidadeHorasRecurso.toString(),
      periodoExMesesRecurso: this.listaRecursos[index].periodoExMesesRecurso.toString(),
      centroCustoRecurso: this.listaRecursos[index].centroCustoRecurso,
    })
    this.listaRecursos.splice(index, 1)
  }

  removerRecurso(index: number) {
    this.listaRecursos.splice(index, 1)
  }

  listaCentrodeCusto: number[] = [];
  resultado: boolean = true;

  adicionarCentroCusto() {
    try {
      this.propostaService.addCenterOfCost()
    } catch (err) {
      this.showError("Não foi possível adicionar o centro de custo")
    }
  }

  removerCentroDeCusto(index: number) {
    this.propostaService.removeCenterOfCost(index);
  }

  ngOnInit(): void {
  }
}
