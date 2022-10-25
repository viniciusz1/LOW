import { TelaVerPauta } from './tela-ver-pauta/tela-ver-pauta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesReutilizaveisModule } from 'src/app/componentes-reutilizaveis/componentes-reutilizaveis.module';
import { TelaDataComissaoComponent } from './tela-dataComissao/tela-dataComissao.component';



@NgModule({
  declarations: [
    TelaDataComissaoComponent,
    TelaVerPauta
  ],
  imports: [
    CommonModule,
    ComponentesReutilizaveisModule
  ]
})
export class ReunioesModule { }
