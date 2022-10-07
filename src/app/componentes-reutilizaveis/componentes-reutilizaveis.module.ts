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



@NgModule({
  declarations: [
    ListDemandaComponent,
    CardReuniaoComponent,
    CardDemandaComponent,
    SidebarDemandaComponent,
    SidebarReuniaoComponent,
    NotificacoesComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ],
  exports:[
    CardDemandaComponent,
    ListDemandaComponent,
    SidebarDemandaComponent,
    NotificacoesComponent
  ]
})
export class ComponentesReutilizaveisModule { }
