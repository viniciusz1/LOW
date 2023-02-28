import { DemandaService } from 'src/app/services/demanda.service';
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
interface RecursoDoForm{
  nomeRecurso: string,
  tipoDespesaRecurso: TipoDespesa,
  perfilDespesaRecurso: string,
  quantidadeHorasRecurso: number,
  valorHoraRecurso: number,
  periodoExMesesRecurso: number,
  centrosCusto?: {porcentagem: number, centroCusto: number}[]
  porcentagemCustoRecurso: number[],
  centroDeCustoRecurso: {codigoCentroCusto:number}[]
}

@Component({
  selector: 'app-parte-reuniao',
  templateUrl: './parte-reuniao.component.html',
  styleUrls: ['./parte-reuniao.component.scss'],
})
export class ParteReuniaoComponent implements OnInit {
  constructor(
    private propostaService: PropostaService,
    private centroCustoService: CentroCustoService,
    private demandaService: DemandaService

  ) {
    // spyService.addTarget(target: 'reuniao', offset: 0)
  }
  custosTotais: number = 0;
  paybackProposta = this.propostaService.paybackProposta;
  centrosCusto: CentroCusto[] = [];
  formProposta = this.propostaService.formProposta;
  formRecursos = this.propostaService.formRecursos;
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
  tipoDaDespesa = [{ tipo: 'Interna', value: 'interno' }, { tipo: 'Externa', value: 'externo' }];
  perfilDaDespesa = [{ tipo: 'Hardware', value: 'hardware' }, { tipo: 'Software', value: 'software' }, { tipo: 'Corporativo', value: 'corporativo' }];

  onSubmit() {
    // console.log(this.formProposta.value);
  }
  porcentagemCC: [{ porcentagem: string; index: number }] = [
    { porcentagem: '', index: 0 },
  ];
  quantidadeCC = [0];
  centrosDeCustoOpcoes = [ 'Center 1', 'Center 2', 'Center 3' ];
  //fazer verificações necessárias
  addRowRecurso() {
    if(this.formRecursos.valid){
      this.listaRecursos.push(this.formRecursos.value as unknown as RecursoDoForm);
      this.mudarCustoTotalProjetoEPayback();
      this.formRecursos.reset()
    }
  }

  mudarCustoTotalProjetoEPayback(){
    this.custosTotais = 0
    this.listaRecursos.forEach(recurso => {
      this.custosTotais += recurso.valorHoraRecurso * recurso.quantidadeHorasRecurso;
    })
    this.paybackProposta = this.custosTotais / (this.demandaService.getBeneficioReal() + this.demandaService.getBeneficioPotencial());
  }



  editarRecurso(index: number){
    this.formRecursos.patchValue({
      nomeRecurso: this.listaRecursos[index].nomeRecurso,
      tipoDespesaRecurso: this.listaRecursos[index].tipoDespesaRecurso,
      perfilDespesaRecurso: this.listaRecursos[index].perfilDespesaRecurso,
      valorHoraRecurso: this.listaRecursos[index].valorHoraRecurso.toString(),
      quantidadeHorasRecurso: this.listaRecursos[index].quantidadeHorasRecurso.toString(),
      periodoExMesesRecurso: this.listaRecursos[index].periodoExMesesRecurso.toString(),
      centrosCusto: this.listaRecursos[index].centrosCusto,
    })
    this.listaRecursos.splice(index, 1)
  }

  removerRecurso(index: number){
    this.listaRecursos.splice(index, 1)
  }

  listaPorcentagem: number[] = [];
  resultado: boolean = true;

  adicionarCentroCusto(){
    this.propostaService.addCenterOfCost()
    
    let porcentagemElement: HTMLInputElement = document.getElementById("porcentagemLista") as HTMLInputElement;
    let porcentagem: string = porcentagemElement.value;

    //Lógica para verificar quando fecha em 100%

    let soma: number = this.listaPorcentagem.reduce((total, numero) => total + numero, 0);
    let total: number = soma + parseInt(porcentagem);

    if(total < 100){
      this.listaPorcentagem.push(parseInt(porcentagem));
      this.propostaService.addCenterOfCost()
      this.resultado = true;
    } else if(total == 100){
      this.listaPorcentagem.push(parseInt(porcentagem));
      alert("Os Centros de Custo fecharam em 100%")
      this.resultado = false;
    } else if(total > 100){
      alert("Este valor vai passar de 100%, escolha um menor")
      this.resultado = true;
    }

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
