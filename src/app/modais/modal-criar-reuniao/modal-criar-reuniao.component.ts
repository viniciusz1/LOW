import { Router } from '@angular/router';
import { ComissaoService } from './../../services/comissao.service';
import { DemandaService } from 'src/app/services/demanda.service';
import { FormBuilder } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { Demanda } from 'src/app/models/demanda.model';
import { Reuniao } from 'src/app/models/reuniao.model';
import { Comissao } from 'src/app/models/comissao.model';
import { Component, OnInit, Inject } from '@angular/core';
import { Proposta } from 'src/app/models/proposta.model';
import { ReuniaoService } from 'src/app/services/reuniao.service';

@Component({
  selector: 'app-modal-criar-reuniao',
  templateUrl: './modal-criar-reuniao.component.html',
  styleUrls: ['./modal-criar-reuniao.component.scss'],
})
export class ModalCriarReuniaoComponent implements OnInit {
  constructor(
    @Inject(DIALOG_DATA) public data: Demanda,
    public dialogRef: DialogRef<ModalCriarReuniaoComponent>,
    private fb: FormBuilder,
    private comissaoService: ComissaoService,
    private demandaService: DemandaService,
    private reuniaoService: ReuniaoService,
    private router: Router
  ) {


  }

  ngOnInit(): void {
    this.atualizarComissoes();
    this.atualizarDemandas();
  }

  listaComissoes = [
    {codigo: 1, nome:"CPVM – Comissão de Processos de Vendas e Desenvolvimento de produtos"},
    {codigo: 2, nome:"CPGCI – Comissão de Processos da Cadeia Integrada"},
    {codigo: 3, nome:"CPGPR – Comissão de Processos de Gestão de Projetos"},
    {codigo: 4, nome:"CGPN – Comitê de Gestão de Processos de Negócio"},
    {codigo: 5, nome:"CTI – Comitê de TI"},
    {codigo: 6, nome:"CWBS – Comitê WEG Business Services"},
    {codigo: 7, nome:"DTI – Diretoria de TI"},
  ]
    

  listaReunioes: Reuniao[] = [];
  listaDemandasEscolhidas: Demanda[] = [];
  draggedDemanda: Demanda | undefined = undefined;
  listaDeComissoesReuniao: Comissao[] = [];
  listaDemandas: Demanda[] = [];
  listaProposta: Proposta[] = [];

  dataReuniao: any;
  comissaoSelecionada: Comissao | undefined = undefined;

  onSubmit() {
    let reuniao: Reuniao = {
      dataReuniao: this.dataReuniao,
      comissaoReuniao: this.comissaoSelecionada,
      propostasReuniao: this.listaDemandasEscolhidas
    }

    this.reuniaoService.postReuniao(reuniao).subscribe(e => {
      this.router.navigate(['/tela-inicial/ver-pauta/' + e.codigoReuniao])
      this.dialogRef.close()
    })
  }

  novaReuniaoForm = this.fb.group({
    listaDemandas: [this.listaDemandasEscolhidas],
    dataReuniao: [''],
    comissaoReuniao: [this.comissaoSelecionada],
  });
  dragStart(demanda: Demanda) {
    this.draggedDemanda = demanda;
  }

  excluirDemanda(demanda: Demanda) {
    this.listaDemandasEscolhidas.splice(
      this.listaDemandasEscolhidas.indexOf(demanda),
      1
    );
    this.listaDemandas.push(demanda);
  }

  adicionarDemanda(demanda: Demanda) {
    this.listaDemandasEscolhidas.push(demanda);
    this.listaDemandas.splice(this.listaDemandas.indexOf(demanda), 1);
  }

  drop() {
    if (this.draggedDemanda) {
      let draggedProductIndex = this.findIndex(this.draggedDemanda);
      this.listaDemandasEscolhidas = [
        ...this.listaDemandasEscolhidas,
        this.draggedDemanda,
      ];
      this.listaDemandas = this.listaDemandas.filter(
        (val, i) => i != draggedProductIndex
      );
      this.draggedDemanda = undefined;
    }
  }

  atualizarComissoes() {
    this.comissaoService
      .getComissao()
      .subscribe({
        next: (comissao) => (this.listaDeComissoesReuniao = comissao),
        error: (err) => console.log(err),
      });
  }

  removerDaListaAdicSecundaria() {
    if (this.data) {
      this.listaDemandasEscolhidas.push(this.data);
      for (let i of this.listaDemandas) {
        if (i.codigoDemanda == this.data.codigoDemanda) {
          this.listaDemandas.splice(this.listaDemandas.indexOf(i), 1);
        }
      }
    }
  }

  atualizarDemandas() {
    this.demandaService
      .getDemandasFiltradasStatus({ status1: StatusDemanda.ASSESSMENT + "", status2: StatusDemanda.BUSINESS_CASE + "" })
      .subscribe({
        next: (demanda) => {
          this.listaDemandas = demanda
          this.removerDaListaAdicSecundaria()
        },
        error: (err) => console.log(err),
      });
  }

  dragEnd() {
    this.draggedDemanda = undefined;
  }

  findIndex(demanda: Demanda) {
    let index = -1;
    for (let i = 0; i < this.listaDemandas.length; i++) {
      if (demanda.codigoDemanda === this.listaDemandas[i].codigoDemanda) {
        index = i;
        break;
      }
    }
    return index;
  }

}
