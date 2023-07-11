import { InputTextModule } from 'primeng/inputtext';
import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaPerfilComponent } from './tela-perfil/tela-perfil.component';
import { TelaLayoutComponent } from './tela-layout/tela-layout.component';
import { TelaAjudaComponent } from './tela-ajuda/tela-ajuda.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ComponentesReutilizaveisModule } from 'src/app/componentes-reutilizaveis/componentes-reutilizaveis.module';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';





@NgModule({
  declarations: [
    TelaPerfilComponent,
    TelaLayoutComponent,
    TelaAjudaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ColorPickerModule,
    ComponentesReutilizaveisModule,
    InputTextModule,
    MessagesModule,
    TableModule,
    InputSwitchModule
  ]
})
export class PerfilModule { }
