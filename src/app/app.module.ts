import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ComponentesFixosModule } from './componentes-fixos/componentes-fixos.module';
import { ComponentesReutilizaveisModule } from './componentes-reutilizaveis/componentes-reutilizaveis.module';
import { ModelsModule } from './models/models.module';
import { PipesModule } from './pipes/pipes.module';
import { RotasModule } from './rotas.module';
import { TelasModule } from './telas/telas.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
