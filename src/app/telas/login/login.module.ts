import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { ComponentesFixosModule } from 'src/app/componentes-fixos/componentes-fixos.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    TelaLoginComponent
  ],
  imports: [
    CommonModule,
    ComponentesFixosModule,
    RouterModule,
    FormsModule
  ]
})
export class LoginModule { }
