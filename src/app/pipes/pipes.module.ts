import { OrdenarReuniaoPipe } from './ordenar-reunioes.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrarDemandaStatusPipe } from './filtrar-demanda-status.pipe';



@NgModule({
  declarations: [
    FiltrarDemandaStatusPipe,
    OrdenarReuniaoPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FiltrarDemandaStatusPipe,
    OrdenarReuniaoPipe
    
  ]
})
export class PipesModule { }
