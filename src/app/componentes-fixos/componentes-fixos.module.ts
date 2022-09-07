import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PosHeaderComponent } from './pos-header/pos-header.component';
import { EscopoPrincipalComponent } from './escopo-principal/escopo-principal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PosHeaderComponent,
    EscopoPrincipalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentesFixosModule { }
