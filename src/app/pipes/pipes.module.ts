import { OrdenarReuniaoPipe } from './ordenar-reunioes.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrarDemandaStatusPipe } from './filtrar-demanda-status.pipe';
import { FiltrarChatPipe } from './filtrar-chat.pipe';



@NgModule({
  declarations: [
    FiltrarDemandaStatusPipe,
    OrdenarReuniaoPipe,
    FiltrarChatPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FiltrarDemandaStatusPipe,
    OrdenarReuniaoPipe,
    FiltrarChatPipe
  ]
})
export class PipesModule { }
