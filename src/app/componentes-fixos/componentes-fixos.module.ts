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


@NgModule({
  declarations: [
    HeaderComponent,
    PosHeaderComponent,
    EscopoPrincipalComponent
  ],
  imports: [
    CommonModule,
    RotasModule,
    RouterModule,
    ComponentesReutilizaveisModule,
    MatMenuModule,
    BreadcrumbModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ComponentesFixosModule { }
