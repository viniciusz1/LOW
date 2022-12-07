import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ScrollPanelModule
  ],
  exports:[
    ScrollPanelModule,
    FormsModule,
    ButtonModule,
    ConfirmDialogModule
  ]
})
export class SharedModule { }
