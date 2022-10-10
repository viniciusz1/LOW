import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { ComponentesFixosModule } from 'src/app/componentes-fixos/componentes-fixos.module';



@NgModule({
  declarations: [
    TelaLoginComponent
  ],
  imports: [
    CommonModule,
    ComponentesFixosModule
  ]
})
export class LoginModule { }
