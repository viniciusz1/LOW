import { PropostaService } from './../../../services/proposta.service';

import { MessageService } from 'primeng/api';
import { RotasModule } from './../../../rotas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { InputTextModule } from 'primeng/inputtext';
import { TelaCorridaComponent } from './tela-corrida/tela-corrida.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollSpyModule } from 'ng-spy';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ParteDemandaComponent } from './tela-corrida/parte-demanda/parte-demanda.component';
import { ParteReuniaoComponent } from './tela-corrida/parte-reuniao/parte-reuniao.component';
import {TooltipModule} from 'primeng/tooltip';
import { TimelineModule } from 'primeng/timeline';
import {AccordionModule} from 'primeng/accordion';



@NgModule({
  declarations: [
    TelaCorridaComponent,
    ParteDemandaComponent,
    ParteReuniaoComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule,
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
    ScrollSpyModule,
    FileUploadModule,
    HttpClientModule,
    InputTextareaModule,
    InputNumberModule,
    MultiSelectModule,
    AutoCompleteModule,
    TooltipModule,
    TimelineModule,
    AccordionModule
  ],
  providers: [
    MessageService,
    PropostaService
  ]
})
export class GeracaoPropostaOuDemandaModule { }
