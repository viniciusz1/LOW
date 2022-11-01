import { AngularMaterialModule } from './../../angular-material/angular-material.module';

import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { TelaHistoricoDemandaComponent } from './tela-historico-demanda/tela-historico-demanda.component';
import { TelaClassificarDemandaComponent } from './tela-classificar-demanda/tela-classificar-demanda.component';
import { GeracaoPropostaOuDemandaModule } from './geracao-proposta-ou-demanda/geracao-proposta-ou-demanda.module';
import { ComponentesReutilizaveisModule } from 'src/app/componentes-reutilizaveis/componentes-reutilizaveis.module';
import { DialogModule } from '@angular/cdk/dialog';
import { ModaisModule } from 'src/app/modais/modais.module';
import { DemandaService } from 'src/app/services/demanda.service';
import { RascunhosComponent } from './rascunhos/rascunhos.component';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    TelaInicialComponent,
    TelaHistoricoDemandaComponent,
    TelaClassificarDemandaComponent,
    RascunhosComponent
  ],
  imports: [
    CommonModule,
    GeracaoPropostaOuDemandaModule,
    ComponentesReutilizaveisModule,
    NgbModule,
    MatButtonModule,
    RouterModule,
    DialogModule,
    ModaisModule,
    MatSortModule,
    MatProgressSpinnerModule,
    PipesModule
  ],
})
export class DemandasModule { }
