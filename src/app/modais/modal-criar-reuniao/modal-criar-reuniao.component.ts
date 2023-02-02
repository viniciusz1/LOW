import { ComissaoService } from './../../services/comissao.service';
import { DemandaService } from 'src/app/services/demanda.service';
import { FormBuilder } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { Demanda } from 'src/app/models/demanda.model';
import { Reuniao } from 'src/app/models/reuniao.model';
import { Comissao } from 'src/app/models/comissao.model';
import { Component, OnInit } from '@angular/core';
import { PropostaService } from 'src/app/services/proposta.service';
import { Proposta } from 'src/app/models/proposta.model';
import { ReuniaoService } from 'src/app/services/reuniao.service';

@Component({
  selector: 'app-modal-criar-reuniao',
  templateUrl: './modal-criar-reuniao.component.html',
  styleUrls: ['./modal-criar-reuniao.component.scss'],
})
export class ModalCriarReuniaoComponent implements OnInit {
  constructor(
    public dialogRef: DialogRef<ModalCriarReuniaoComponent>,
    private fb: FormBuilder,
    private comissaoService: ComissaoService,
    private demandaService: DemandaService,
    private propostaService: PropostaService,
    private reuniaoService: ReuniaoService
  ) {}

  ngOnInit(): void {
    this.atualizarComissoes();
    this.atualizarDemandas();
  }
  
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
          demandasReuniao: this.listaDemandasEscolhidas
         }
         
         this.reuniaoService.postReuniao(reuniao).subscribe(e => {
                console.log(e)
              })
    console.log(this.listaDemandas)
    console.log(this.listaDeComissoesReuniao)
    console.log(this.listaProposta)
    console.log(this.novaReuniaoForm.value);
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

  atualizarDemandas() {
    this.demandaService
      .getDemandas()
      .subscribe({
        next: (demanda) => (this.listaDemandas = demanda),
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
