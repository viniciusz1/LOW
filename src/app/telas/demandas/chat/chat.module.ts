import { SharedModule } from './../../../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaChatComponent } from './tela-chat/tela-chat.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {SpeedDialModule} from 'primeng/speeddial';
import { WebSocketConnector } from 'src/app/websocket/websocket-connector';




@NgModule({
  declarations: [
    TelaChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ConfirmDialogModule,
    SharedModule,
    SpeedDialModule
  ],
  providers: []
})
export class ChatModule { }
