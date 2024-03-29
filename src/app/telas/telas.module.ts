import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentesReutilizaveisModule } from 'src/app/componentes-reutilizaveis/componentes-reutilizaveis.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandasModule } from './demandas/demandas.module';
import { LoginModule } from './login/login.module';
import { PerfilModule } from './perfil/perfil.module';
import { ReunioesModule } from './reunioes/reunioes.module';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
  
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    DemandasModule,
    LoginModule,
    PerfilModule,
    ReunioesModule,
    SharedModule
  ],
  providers: [
  ]
})
export class TelasModule { }
