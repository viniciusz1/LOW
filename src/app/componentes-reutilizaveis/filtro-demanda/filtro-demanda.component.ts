import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Filtro } from 'src/app/models/filtro.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { UsuarioService } from 'src/app/services/usuario.service';
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
  status: string[] = [];
  nivelAcesso = "";
  // tamanho: any[] = [];
  valorTamanho: any = "";
  valorStatus: any = "";
  mostrarExel = false
  atualizarFiltro(dados: Filtro) {
    this.demandaService.setFiltroData = dados
    this.filtroAcionado.emit()
    this.mostrarExel = true
  }

  constructor(private demandaService: DemandaService,
    private usuarioService: UsuarioService) {
    this.tamanho = [
      "Muito Pequeno",
      "Pequeno",
      "Médio",
      "Grande",
      "Muito Grande",
    ]

    this.status = [
      "Backlog",
      "Assessment",
      "To-Do",
      "Cancelled",
      "Done",
    ]
  }

  ngOnInit(): void {
    this.mostrarExel = false;
    if(this.usuarioService.getRole){
    this.nivelAcesso = this.usuarioService.getRole
    console.log(this.nivelAcesso)
    }
  }
}
