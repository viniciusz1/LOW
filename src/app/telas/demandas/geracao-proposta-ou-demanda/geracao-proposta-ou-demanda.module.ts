import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaEtapaUmComponent } from './tela-etapa-um/tela-etapa-um.component';
import { TelaEtapaDoisComponent } from './tela-etapa-dois/tela-etapa-dois.component';
import { TelaEtapaTresComponent } from './tela-etapa-tres/tela-etapa-tres.component';
import { TelaEtapaQuatroComponent } from './tela-etapa-quatro/tela-etapa-quatro.component';
import { TelaEtapaCincoComponent } from './tela-etapa-cinco/tela-etapa-cinco.component';



@NgModule({
  declarations: [
    TelaEtapaUmComponent,
    TelaEtapaDoisComponent,
    TelaEtapaTresComponent,
    TelaEtapaQuatroComponent,
    TelaEtapaCincoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GeracaoPropostaOuDemandaModule { }
