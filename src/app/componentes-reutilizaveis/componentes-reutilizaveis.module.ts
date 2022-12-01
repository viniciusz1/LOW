import { NotificacoesComponent } from './notificacoes/notificacoes.component';
import { RotasModule } from './../rotas.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDemandaComponent } from './list-demanda/list-demanda.component';
import { CardReuniaoComponent } from './card-reuniao/card-reuniao.component';
import { SidebarDemandaComponent } from './sidebar-demanda/sidebar-demanda.component';
import { SidebarReuniaoComponent } from './sidebar-reuniao/sidebar-reuniao.component';
import { CardDemandaComponent } from './card-demanda/card-demanda.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { FiltroDemandaComponent } from './filtro-demanda/filtro-demanda.component';
import { FiltroReuniaoComponent } from './filtro-reuniao/filtro-reuniao.component';
import {InputTextModule} from 'primeng/inputtext';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import {ScrollPanelModule} from 'primeng/scrollpanel';

@NgModule({
  declarations: [
    ListDemandaComponent,
    CardReuniaoComponent,
    CardDemandaComponent,
    SidebarDemandaComponent,
    SidebarReuniaoComponent,
    FiltroDemandaComponent,
    FiltroReuniaoComponent,
    NotificacoesComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    RotasModule,
    InputTextModule,
    TimelineModule,
    CardModule,
    ScrollPanelModule
  ],
  exports:[
    CardDemandaComponent,
    ListDemandaComponent,
    SidebarDemandaComponent,
    CardReuniaoComponent,
    FiltroDemandaComponent,
    FiltroReuniaoComponent,
    SidebarReuniaoComponent,
    NotificacoesComponent
  ]
})
export class ComponentesReutilizaveisModule { }
