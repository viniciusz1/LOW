import { RouterModule } from '@angular/router';
import { TelaVerPauta } from './tela-ver-pauta/tela-ver-pauta.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesReutilizaveisModule } from 'src/app/componentes-reutilizaveis/componentes-reutilizaveis.module';
import { TelaReuniaoComponent } from './tela-reuniao/tela-reuniao.component';
import { InputTextModule } from "primeng/inputtext";
import { TelaCalendarioComponent } from './tela-calendario/tela-calendario.component';

import 'web-component-essentials';

@NgModule({
  declarations: [
    TelaReuniaoComponent,
    TelaVerPauta,
    TelaCalendarioComponent
  ],
  imports: [
    CommonModule,
    ComponentesReutilizaveisModule,
    InputTextModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReunioesModule { }
