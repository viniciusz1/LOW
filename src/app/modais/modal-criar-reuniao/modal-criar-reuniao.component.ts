import { Router } from '@angular/router';
import { DemandaService } from 'src/app/services/demanda.service';
import { FormBuilder } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { Demanda } from 'src/app/models/demanda.model';
import { Reuniao } from 'src/app/models/reuniao.model';
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
    private demandaService: DemandaService,
    private reuniaoService: ReuniaoService,
    private router: Router
  ) {


  }

  ngOnInit(): void {
    this.atualizarDemandas();
  }

  listaComissoes = [
    {value: "CPVM", nome:"CPVM – Comissão de Processos de Vendas e Desenvolvimento de produtos"},
    {value: "CPGCI", nome:"CPGCI – Comissão de Processos da Cadeia Integrada"},
    {value: "CPGPR", nome:"CPGPR – Comissão de Processos de Gestão de Projetos"},
    {value: "CGPN", nome:"CGPN – Comitê de Gestão de Processos de Negócio"},
    {value: "CTI", nome:"CTI – Comitê de TI"},
    {value: "CWBS", nome:"CWBS – Comitê WEG Business Services"},
    {value: "DTI", nome:"DTI – Diretoria de TI"},
  ]
    

  listaReunioes: Reuniao[] = [];
  listaDemandasEscolhidas: Demanda[] = [];
  draggedDemanda: Demanda | undefined = undefined;
  listaDemandas: Demanda[] = [];
  listaProposta: Proposta[] = [];

  dataReuniao: any;
  comissaoSelecionada: string | undefined = undefined;

  onSubmit() {
    let reuniao: Reuniao = {
      dataReuniao: this.dataReuniao,
      comissaoReuniao: this.comissaoSelecionada,
      propostasReuniao: this.listaDemandasEscolhidas
    }
    console.log(reuniao)
    this.reuniaoService.postReuniao(reuniao).subscribe(e => {
      this.router.navigate(['/tela-inicial/ver-pauta/' + e.codigoReuniao])
      this.dialogRef.close()
    })
  }
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
