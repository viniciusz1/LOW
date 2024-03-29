import { PipesModule } from 'src/app/pipes/pipes.module';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from './../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TelaVerPauta } from './tela-ver-pauta/tela-ver-pauta.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesReutilizaveisModule } from 'src/app/componentes-reutilizaveis/componentes-reutilizaveis.module';
import { TelaReuniaoComponent } from './tela-reuniao/tela-reuniao.component';
import { InputTextModule } from "primeng/inputtext";
import { TelaCalendarioComponent } from './tela-calendario/tela-calendario.component';
import {DragDropModule} from 'primeng/dragdrop';
import {CalendarModule} from 'primeng/calendar';
import {CascadeSelectModule} from 'primeng/cascadeselect';

import 'web-component-essentials';
import { JoyrideModule } from 'ngx-joyride';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    TelaReuniaoComponent,
    TelaVerPauta,
    TelaCalendarioComponent
  ],
  imports: [
    CommonModule,
    ComponentesReutilizaveisModule,
    InputTextModule,
    RouterModule,
    DragDropModule,
    CalendarModule,
    CascadeSelectModule,
    SharedModule,
    DropdownModule,
    JoyrideModule.forRoot(),
    PaginatorModule,
    PipesModule,
    FileUploadModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReunioesModule { }
