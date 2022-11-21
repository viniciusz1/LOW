import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollPanelModule} from 'primeng/scrollpanel';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ScrollPanelModule
  ],
  exports:[
    ScrollPanelModule,
    FormsModule
  ]
})
export class SharedModule { }
