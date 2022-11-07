import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrarDemandaStatusPipe } from './filtrar-demanda-status.pipe';



@NgModule({
  declarations: [
    FiltrarDemandaStatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FiltrarDemandaStatusPipe
  ]
})
export class PipesModule { }
