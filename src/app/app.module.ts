import { SharedModule } from 'src/app/shared/shared.module';
import { UsuarioService } from './services/usuario.service';

import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ComponentesFixosModule } from './componentes-fixos/componentes-fixos.module';
import { ComponentesReutilizaveisModule } from './componentes-reutilizaveis/componentes-reutilizaveis.module';
import { ModelsModule } from './models/models.module';
import { PipesModule } from './pipes/pipes.module';
import { RotasModule } from './rotas.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemandaService } from './services/demanda.service';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {  TranslateService, TranslateStore } from '@ngx-translate/core';
import { LogInterceptor } from './interceptor';
import { TelasModule } from './telas/telas.module';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TelasModule,
    PipesModule,
    ModelsModule,
    ComponentesFixosModule,
    ComponentesReutilizaveisModule,
    RotasModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DialogModule,
    SharedModule,
    MessagesModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LogInterceptor,
    multi: true   
  },
    DemandaService, ConfirmationService, UsuarioService, TranslateService, TranslateStore],
  bootstrap: [AppComponent],
})
export class AppModule { }
