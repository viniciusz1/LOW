import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PosHeaderComponent } from './pos-header/pos-header.component';
import { EscopoPrincipalComponent } from './escopo-principal/escopo-principal.component';
import { RotasModule } from '../rotas.module';
import { RouterModule } from '@angular/router';
import { ComponentesReutilizaveisModule } from '../componentes-reutilizaveis/componentes-reutilizaveis.module';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { JoyrideModule } from 'ngx-joyride';
import {TabMenuModule} from 'primeng/tabmenu';
import { EscopoPerfilComponent } from './escopo-perfil/escopo-perfil.component';

/*
  Módulo do sistema onde ficam componentes em que são usados em múltiplas telas e não necessitam 
  de muitas alterações de valores, como cabeçalhos, pós cabeçalhos e escopos, ou seja a parte fixa
  de algumas telas que se encontram no sistema
*/

@NgModule({
  declarations: [
    HeaderComponent,
    PosHeaderComponent,
    EscopoPrincipalComponent,
    EscopoPerfilComponent
  ],
  imports: [
    CommonModule,
    RotasModule,
    RouterModule,
    ComponentesReutilizaveisModule,
    MatMenuModule,
    BreadcrumbModule,
    JoyrideModule.forRoot(),
    TabMenuModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
  ]
})
export class ComponentesFixosModule { }
