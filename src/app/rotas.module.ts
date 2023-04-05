import { EscopoPerfilComponent } from './componentes-fixos/escopo-perfil/escopo-perfil.component';
import { TelaAjudaComponent } from './telas/perfil/tela-ajuda/tela-ajuda.component';
import { TelaSugestoesComponent } from './telas/perfil/tela-sugestoes/tela-sugestoes.component';
import { TelaLayoutComponent } from './telas/perfil/tela-layout/tela-layout.component';
import { TelaCalendarioComponent } from './telas/reunioes/tela-calendario/tela-calendario.component';
import { TelaReuniaoComponent } from './telas/reunioes/tela-reuniao/tela-reuniao.component';
import { TelaVerPauta } from './telas/reunioes/tela-ver-pauta/tela-ver-pauta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EscopoPrincipalComponent } from './componentes-fixos/escopo-principal/escopo-principal.component';
import { TelaInicialComponent } from './telas/demandas/tela-inicial/tela-inicial.component';
import { TelaClassificarDemandaComponent } from './telas/demandas/tela-classificar-demanda/tela-classificar-demanda.component';
import { TelaChatComponent } from './telas/demandas/chat/tela-chat/tela-chat.component';
import { TelaPerfilComponent } from './telas/perfil/tela-perfil/tela-perfil.component';
import { SidebarDemandaComponent } from './componentes-reutilizaveis/sidebar-demanda/sidebar-demanda.component';
import { TelaLoginComponent } from './telas/login/tela-login/tela-login.component';
import { TelaCorridaComponent } from './telas/demandas/geracao-proposta-ou-demanda/tela-corrida/tela-corrida.component';
import { AuthenticationGuard } from './security/authentication.guard';
import { AuthenticationChildGuard } from './security/authentication-child.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: TelaLoginComponent,
        
      },
      {
        path: 'tela-inicial',
        component: EscopoPrincipalComponent,
        canActivateChild: [AuthenticationChildGuard],

        children: [
          {
            path: '',
            component: TelaInicialComponent
          },
          {
            path: 'classificar-demanda/:codigoDemanda',
            component: TelaClassificarDemandaComponent
          },
          {
            path: 'rascunhos',
            component: TelaInicialComponent
          },
          {
            path: 'chat',
            component: TelaChatComponent
          },
          {
            path: 'demanda',
            component: TelaCorridaComponent
          },
          {
            path: 'reformular-demanda/:codigoDemanda',
            component: TelaCorridaComponent
          },

          {
            path: 'proposta/:codigoDemanda',
            component: TelaCorridaComponent
          },
          {
            path: 'reunioes',
            component: TelaReuniaoComponent
          },
          {
            path: 'ver-reuniao/:codigoReuniao',
            component: TelaVerPauta
          },
          {
            path: 'configuracoes',
            component: EscopoPerfilComponent,
            children: [
              {
                path: 'perfil',
                component: TelaPerfilComponent
              },
              {
                path: 'layout',
                component: TelaLayoutComponent
              },
              {
                path: 'sugestoes',
                component: TelaSugestoesComponent
              },
              {
                path: 'ajuda',
                component: TelaAjudaComponent
              }
            ]
          },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ],


})
export class RotasModule { }
