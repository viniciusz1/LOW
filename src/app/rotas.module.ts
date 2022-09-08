import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EscopoPrincipalComponent } from './componentes-fixos/escopo-principal/escopo-principal.component';
import { TelaInicialComponent } from './telas/demandas/tela-inicial/tela-inicial.component';
import { TelaClassificarDemandaComponent } from './telas/demandas/tela-classificar-demanda/tela-classificar-demanda.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'tela-inicial',
        component: EscopoPrincipalComponent,
        children: [
          {
            path: '',
            component: TelaInicialComponent
          },
          {
            path: 'classificar-demanda',
            component: TelaClassificarDemandaComponent
          },
        ]
      }
    ])
  ],
  exports:[
    RouterModule
  ],


})
export class RotasModule { }
