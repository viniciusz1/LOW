import { DemandaService } from './../../../../../services/demanda.service';
import { CentroCustoService } from './../../../../../services/centro-custo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CentroCusto } from 'src/app/models/centro-custo.model';

@Component({
  selector: 'app-parte-demanda',
  templateUrl: './parte-demanda.component.html',
  styleUrls: ['./parte-demanda.component.scss'],
})
export class ParteDemandaComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private centroCustoService: CentroCustoService,
    private demandaService: DemandaService
  ) {}

  demandaForm = this.demandaService.demandaForm;
  selectedCentros: any;
  centrosCusto: CentroCusto[] = [];
  opcoesDeTamanho = [
     'Muito Pequena' ,
     'Pequena' ,
     'Média' ,
     'Grande' ,
     'Muito Grande'
  ];
  opcoesDeMoeda = [{ name: 'BRL' }, { name: 'EUR' }, { name: 'DOL' }];

  ngOnInit(): void {
    this.atualizarCentrosCusto();
  }
  atualizarCentrosCusto() {
    this.centroCustoService.getCentrosCusto().subscribe({
      next: (centrosCusto) => (this.centrosCusto = centrosCusto),
      error: (err) => console.log(err),
    });
  }
}
