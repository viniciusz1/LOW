import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaPerfilComponent } from './tela-perfil/tela-perfil.component';
import { TelaLayoutComponent } from './tela-layout/tela-layout.component';
import { TelaNotificacoesComponent } from './tela-notificacoes/tela-notificacoes.component';
import { TelaSugestoesComponent } from './tela-sugestoes/tela-sugestoes.component';
import { TelaAjudaComponent } from './tela-ajuda/tela-ajuda.component';



@NgModule({
  declarations: [
    TelaPerfilComponent,
    TelaLayoutComponent,
    TelaNotificacoesComponent,
    TelaSugestoesComponent,
    TelaAjudaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PerfilModule { }
