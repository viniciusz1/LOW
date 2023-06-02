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
  tamanho: string[] = [];
  status:  { label: string, value: string }[] = [];
  // tamanho: any[] = [];
  valorTamanho: any = "";
  valorStatus: any = "";
  mostrarExcel: boolean = false
  atualizarFiltro(dados: Filtro) {
    this.demandaService.setFiltroData = dados
    this.filtroAcionado.emit()
    if (!this.filtroReduzidoVertical) {
      this.mostrarExcel = true
    }
  }

  constructor(private demandaService: DemandaService) {
    this.tamanho = [
      "Muito Pequeno",
      "Pequeno",
      "Médio",
      "Grande",
      "Muito Grande",
    ]
  }

  ngOnInit(): void {
    this.mostrarExcel = false
    console.log(this.filtroReduzidoVertical)
    if (this.filtroReduzidoVertical == true) {
      this.status = [
        { label: "Business Case", value: "BUSINESS_CASE" },
        { label: "Assessment", value: "ASSESSMENT" },
      ]
    } else {
      this.status = [
        { label: "Backlog - Classificação", value: "BACKLOG_CLASSIFICACAO" },
        { label: "Backlog - Proposta", value: "BACKLOG_PROPOSTA" },
        { label: "Backlog - Aprovação", value: "BACKLOG_APROVACAO" },
        { label: "Business Case", value: "BUSINESS_CASE" },
        { label: "Assessment", value: "ASSESSMENT" },
        { label: "To Do", value: "TO_DO" },
        { label: "Design and Build", value: "DESIGN_AND_BUILD" },
        { label: "Support", value: "SUPPORT" },
        { label: "Cancelled", value: "CANCELLED" },
        { label: "Done", value: "DONE" },
        { label: "Discussion", value: "DISCUSSION" },
        { label: "Draft", value: "DRAFT" },
      ]
    }
  }
}
