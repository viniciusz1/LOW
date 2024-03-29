import { PropostaService } from './../../services/proposta.service';
import { SecaoService } from '../../services/secao.service';
import { DemandaClassificadaService } from '../../services/demanda-classificada.service';
import { ChatModule } from './chat/chat.module';
import { DropdownModule } from 'primeng/dropdown';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { TelaClassificarDemandaComponent } from './tela-classificar-demanda/tela-classificar-demanda.component';
import { GeracaoPropostaOuDemandaModule } from './geracao-proposta-ou-demanda/geracao-proposta-ou-demanda.module';
import { ComponentesReutilizaveisModule } from 'src/app/componentes-reutilizaveis/componentes-reutilizaveis.module';
import { DialogModule } from '@angular/cdk/dialog';
import { ModaisModule } from 'src/app/modais/modais.module';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InputTextModule } from "primeng/inputtext";
import { PipesModule } from 'src/app/pipes/pipes.module';
import { JoyrideModule } from 'ngx-joyride';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {PaginatorModule} from 'primeng/paginator';
import {MultiSelectModule} from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { BusinessUnitService } from 'src/app/services/business-unit.service';
import { FiltrarDemandaStatusPipe } from 'src/app/pipes/filtrar-demanda-status.pipe';



@NgModule({
  declarations: [
    TelaInicialComponent,
    TelaClassificarDemandaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GeracaoPropostaOuDemandaModule,
    ComponentesReutilizaveisModule,
    ChatModule,
    NgbModule,
    MatButtonModule,
    RouterModule,
    DialogModule,
    ModaisModule,
    MatSortModule,
    MatProgressSpinnerModule,
    PipesModule,
    FormsModule,
    InputTextModule,
    JoyrideModule.forRoot(),
    DropdownModule,
    FileUploadModule,
    HttpClientModule,
    PaginatorModule,
    MultiSelectModule,
    ConfirmDialogModule,
    SharedModule,
    PaginatorModule
  ],
  providers:[DemandaClassificadaService,BusinessUnitService, SecaoService, FiltrarDemandaStatusPipe]
})
export class DemandasModule { }
