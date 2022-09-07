import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDemandaComponent } from './list-demanda/list-demanda.component';
import { CardReuniaoComponent } from './card-reuniao/card-reuniao.component';
import { SidebarDemandaComponent } from './sidebar-demanda/sidebar-demanda.component';
import { SidebarReuniaoComponent } from './sidebar-reuniao/sidebar-reuniao.component';



@NgModule({
  declarations: [
    ListDemandaComponent,
    CardReuniaoComponent,
    SidebarDemandaComponent,
    SidebarReuniaoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentesReutilizaveisModule { }
