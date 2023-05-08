import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { ComponentesFixosModule } from 'src/app/componentes-fixos/componentes-fixos.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    TelaLoginComponent
  ],
  imports: [
    CommonModule,
    ComponentesFixosModule,
    RouterModule,
    FormsModule,
    SharedModule,
    InputTextModule,
    MatDialogModule
  ],
  providers: [
    MessageService
  ]
})
export class LoginModule { }
