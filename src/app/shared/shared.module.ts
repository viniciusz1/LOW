import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'ngx.translate.config';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ScrollPanelModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports:[
    ScrollPanelModule,
    FormsModule,
    ButtonModule,
    ConfirmDialogModule,
    TranslateModule,
    ToastModule
  ]
})
export class SharedModule { }
