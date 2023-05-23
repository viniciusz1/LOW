import { HttpClient } from '@angular/common/http';
// import { HttpLoaderFactory } from 'ngx.translate.config';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputFocoDirective } from '../directives/input-foco.directive';



@NgModule({
  declarations: [
    InputFocoDirective
  ],
  imports: [
    CommonModule,
    ScrollPanelModule,

  ],
  exports:[
    ScrollPanelModule,
    FormsModule,
    ButtonModule,
    ConfirmDialogModule,
    TranslateModule,
    ToastModule,
    InputFocoDirective
  ]
})
export class SharedModule { }
