import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaChatComponent } from './tela-chat/tela-chat.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    TelaChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ConfirmDialogModule
  ]
})
export class ChatModule { }
