import { MessageService } from 'primeng/api';
import { RotasModule } from './../../../rotas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaEtapaUmComponent } from './tela-etapa-um/tela-etapa-um.component';
import { TelaEtapaDoisComponent } from './tela-etapa-dois/tela-etapa-dois.component';
import { TelaEtapaTresComponent } from './tela-etapa-tres/tela-etapa-tres.component';
import { TelaEtapaQuatroComponent } from './tela-etapa-quatro/tela-etapa-quatro.component';
import { TelaEtapaCincoComponent } from './tela-etapa-cinco/tela-etapa-cinco.component';
import { NgxEditorModule } from 'ngx-editor';
import { InputTextModule } from 'primeng/inputtext';
import { TelaCorridaComponent } from './tela-corrida/tela-corrida.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [
    TelaEtapaUmComponent,
    TelaEtapaDoisComponent,
    TelaEtapaTresComponent,
    TelaEtapaQuatroComponent,
    TelaEtapaCincoComponent,
    TelaCorridaComponent,

  ],
  imports: [
    CommonModule,
    RotasModule,
    TableModule,
    DropdownModule,
    NgxEditorModule.forRoot({
      locals: {
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ScrollPanelModule
  ],
  providers:[
    MessageService
  ]
})
export class GeracaoPropostaOuDemandaModule { }
