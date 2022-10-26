import { TelaVerPauta } from './tela-ver-pauta/tela-ver-pauta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesReutilizaveisModule } from 'src/app/componentes-reutilizaveis/componentes-reutilizaveis.module';
import { TelaReuniaoComponent } from './tela-reuniao/tela-reuniao.component';



@NgModule({
  declarations: [
    TelaReuniaoComponent,
    TelaVerPauta
  ],
  imports: [
    CommonModule,
    ComponentesReutilizaveisModule
  ]
})
export class ReunioesModule { }
