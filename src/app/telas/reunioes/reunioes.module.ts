import { TelaVerPauta } from './tela-ver-pauta/tela-ver-pauta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesReutilizaveisModule } from 'src/app/componentes-reutilizaveis/componentes-reutilizaveis.module';
import { TelaReuniaoComponent } from './tela-reuniao/tela-reuniao.component';
import { InputTextModule } from "primeng/inputtext";



@NgModule({
  declarations: [
    TelaReuniaoComponent,
    TelaVerPauta
  ],
  imports: [
    CommonModule,
    ComponentesReutilizaveisModule,
    InputTextModule
  ]
})
export class ReunioesModule { }
