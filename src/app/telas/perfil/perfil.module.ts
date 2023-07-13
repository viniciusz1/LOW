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
import { TelaConfigInicialComponent } from './tela-config-inicial/tela-config-inicial.component';
import {DragDropModule} from '@angular/cdk/drag-drop';




@NgModule({
  declarations: [
    TelaPerfilComponent,
    TelaLayoutComponent,
    TelaAjudaComponent,
    TelaConfigInicialComponent
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
    InputSwitchModule,
    DragDropModule
  ]
})
export class PerfilModule { }
