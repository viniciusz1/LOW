import { SharedModule } from './../../../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaChatComponent } from './tela-chat/tela-chat.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {SpeedDialModule} from 'primeng/speeddial';
import { WebSocketConnector } from 'src/app/websocket/websocket-connector';
import { PipesModule } from "../../../pipes/pipes.module";




@NgModule({
    declarations: [
        TelaChatComponent
    ],
    providers: [],
    imports: [
        CommonModule,
        FormsModule,
        ConfirmDialogModule,
        SharedModule,
        SpeedDialModule,
        PipesModule
    ]
})
export class ChatModule { }
