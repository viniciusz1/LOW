import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { ComponentesFixosModule } from 'src/app/componentes-fixos/componentes-fixos.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TelaLoginComponent
  ],
  imports: [
    CommonModule,
    ComponentesFixosModule,
    RouterModule
  ]
})
export class LoginModule { }
