import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { TelaHistoricoDemandaComponent } from './tela-historico-demanda/tela-historico-demanda.component';
import { TelaClassificarDemandaComponent } from './tela-classificar-demanda/tela-classificar-demanda.component';



@NgModule({
  declarations: [
    TelaInicialComponent,
    TelaHistoricoDemandaComponent,
    TelaClassificarDemandaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DemandasModule { }
