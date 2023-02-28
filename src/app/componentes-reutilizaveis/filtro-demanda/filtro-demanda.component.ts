import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Filtro } from 'src/app/models/filtro.model';
import { DemandaService } from 'src/app/services/demanda.service';
@Component({
  selector: 'app-filtro-demanda',
  templateUrl: './filtro-demanda.component.html',
  styleUrls: ['./filtro-demanda.component.scss'],
})
export class FiltroDemandaComponent implements OnInit {
  @Output() closeFiltro = new EventEmitter();
  @Output() filtroAcionado = new EventEmitter<Filtro>();
  @Output() exportarExcel = new EventEmitter<Filtro>();
  @Input() mostrarIconeDeAbrirFiltro = true;
  @Input() filtroReduzidoVertical = false;
  tamanho: {tamanho: string}[] = [];
  status: {status: string}[] = [];
  // tamanho: any[] = [];
  valorTamanho: any;
  valorStatus: any;
  mostrarExel = false
  atualizarFiltro(dados: Filtro){
    this.demandaService.setFiltroData = dados
    this.filtroAcionado.emit()
    this.mostrarExel = true
  }

  constructor(private demandaService: DemandaService) {
    this.tamanho = [
      {tamanho: "Muito Pequeno"},
      {tamanho: "Pequeno"},
      {tamanho: "Médio"},
      {tamanho: "Grande"},
      {tamanho: "Muito Grande"},
    ]

    this.status = [
      {status: "Backlog"},
      {status: "Assessment"},
      {status: "To-Do"},
      {status: "Cancelled"},
      {status: "Done"},
    ]
  }

  ngOnInit(): void {
    this.mostrarExel = false
  }
}
