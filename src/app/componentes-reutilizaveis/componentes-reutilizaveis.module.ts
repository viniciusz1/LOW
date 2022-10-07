import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDemandaComponent } from './list-demanda/list-demanda.component';
import { CardReuniaoComponent } from './card-reuniao/card-reuniao.component';
import { SidebarDemandaComponent } from './sidebar-demanda/sidebar-demanda.component';
import { SidebarReuniaoComponent } from './sidebar-reuniao/sidebar-reuniao.component';
import { CardDemandaComponent } from './card-demanda/card-demanda.component';



@NgModule({
  declarations: [
    ListDemandaComponent,
    CardReuniaoComponent,
    CardDemandaComponent,
    SidebarDemandaComponent,
    SidebarReuniaoComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[
    CardDemandaComponent,
    ListDemandaComponent,
    SidebarDemandaComponent,
    CardReuniaoComponent
    
  ]
})
export class ComponentesReutilizaveisModule { }
