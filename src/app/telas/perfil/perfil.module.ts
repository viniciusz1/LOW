import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaPerfilComponent } from './tela-perfil/tela-perfil.component';
import { TelaLayoutComponent } from './tela-layout/tela-layout.component';
import { TelaSugestoesComponent } from './tela-sugestoes/tela-sugestoes.component';
import { TelaAjudaComponent } from './tela-ajuda/tela-ajuda.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    TelaPerfilComponent,
    TelaLayoutComponent,
    TelaSugestoesComponent,
    TelaAjudaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class PerfilModule { }
