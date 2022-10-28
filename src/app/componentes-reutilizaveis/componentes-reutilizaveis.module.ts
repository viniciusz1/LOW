import { RotasModule } from './../rotas.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDemandaComponent } from './list-demanda/list-demanda.component';
import { CardReuniaoComponent } from './card-reuniao/card-reuniao.component';
import { SidebarDemandaComponent } from './sidebar-demanda/sidebar-demanda.component';
import { SidebarReuniaoComponent } from './sidebar-reuniao/sidebar-reuniao.component';
import { CardDemandaComponent } from './card-demanda/card-demanda.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { FiltroDemandaComponent } from './filtro-demanda/filtro-demanda.component';

@NgModule({
  declarations: [
    ListDemandaComponent,
    CardReuniaoComponent,
    CardDemandaComponent,
    SidebarDemandaComponent,
    SidebarReuniaoComponent,
    NotificacoesComponent,
    FiltroDemandaComponent,
    SidebarReuniaoComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    RotasModule
  ],
  exports:[
    CardDemandaComponent,
    ListDemandaComponent,
    SidebarDemandaComponent,
    CardReuniaoComponent,
    NotificacoesComponent,
    FiltroDemandaComponent

  ]
})
export class ComponentesReutilizaveisModule { }
