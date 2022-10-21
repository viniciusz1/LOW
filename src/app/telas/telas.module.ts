import { ComponentesReutilizaveisModule } from 'src/app/componentes-reutilizaveis/componentes-reutilizaveis.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandasModule } from './demandas/demandas.module';
import { LoginModule } from './login/login.module';
import { PerfilModule } from './perfil/perfil.module';
import { ReunioesModule } from './reunioes/reunioes.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DemandasModule,
    LoginModule,
    PerfilModule,
    ReunioesModule
  ],
  providers: [
  ]
})
export class TelasModule { }
