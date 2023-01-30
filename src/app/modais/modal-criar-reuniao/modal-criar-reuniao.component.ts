import { ComissaoService } from './../../services/comissao.service';
import { FormBuilder } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { Demanda } from 'src/app/models/demanda.model';
import { Reuniao } from 'src/app/models/reuniao.model';
import { Component, OnInit } from '@angular/core';
import { listaReunioes } from 'src/app/telas/reunioes/tela-reuniao/listReunioes';

@Component({
  selector: 'app-modal-criar-reuniao',
  templateUrl: './modal-criar-reuniao.component.html',
  styleUrls: ['./modal-criar-reuniao.component.scss'],
})
export class ModalCriarReuniaoComponent implements OnInit {
  constructor(
    public dialogRef: DialogRef<ModalCriarReuniaoComponent>,
    private fb: FormBuilder,
    private comissaoService: ComissaoService
  ) {}

  ngOnInit(): void {
    this.atualizarComissoes();
  }

  listaReunioes: Reuniao[] = listaReunioes;
  listaDemandasEscolhidas: Demanda[] = [];
  draggedDemanda: Demanda | undefined = undefined;
  listaDeComissoesReuniao: any[] = [
    'Vendas',
    'Compras',
    'Financeiro',
    'RH',
    'Marketing',
    'TI',
    'Jurídico',
    'Diretoria',
  ];

  dataReuniao: any;
  comissaoSelecionada: any;

  onSubmit() {
    console.log(this.novaReuniaoForm.value);
  }

  novaReuniaoForm = this.fb.group({
    listaDemandas: [this.listaDemandasEscolhidas],
    dataReuniao: [''],
    comissaoReuniao: [''],
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
  listaDemandas: Demanda[] = [
    {

      statusDemanda: StatusDemanda.ASSESSMENT,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {

      statusDemanda: StatusDemanda.ASSESSMENT,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {

      statusDemanda: StatusDemanda.BUSINESS_CASE,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {

      statusDemanda: StatusDemanda.ASSESSMENT,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {

      statusDemanda: StatusDemanda.ASSESSMENT,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {

      statusDemanda: StatusDemanda.BUSINESS_CASE,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {

      statusDemanda: StatusDemanda.BUSINESS_CASE,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {

      statusDemanda: StatusDemanda.ASSESSMENT,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {

      statusDemanda: StatusDemanda.ASSESSMENT,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {

      statusDemanda: StatusDemanda.ASSESSMENT,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {

      statusDemanda: StatusDemanda.ASSESSMENT,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {

      statusDemanda: StatusDemanda.ASSESSMENT,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {

      statusDemanda: StatusDemanda.ASSESSMENT,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
    {

      statusDemanda: StatusDemanda.BUSINESS_CASE,
      departamentoBenDemanda: 'Tecnologia da Informação',
      tituloDemanda: 'Sistema de Gestão de Demandas',
    },
  ];
}
