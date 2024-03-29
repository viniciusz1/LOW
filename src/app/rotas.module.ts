import { EscopoPerfilComponent } from './componentes-fixos/escopo-perfil/escopo-perfil.component';
import { TelaAjudaComponent } from './telas/perfil/tela-ajuda/tela-ajuda.component';
import { TelaLayoutComponent } from './telas/perfil/tela-layout/tela-layout.component';
import { TelaReuniaoComponent } from './telas/reunioes/tela-reuniao/tela-reuniao.component';
import { TelaVerPauta } from './telas/reunioes/tela-ver-pauta/tela-ver-pauta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { EscopoPrincipalComponent } from './componentes-fixos/escopo-principal/escopo-principal.component';
import { TelaInicialComponent } from './telas/demandas/tela-inicial/tela-inicial.component';
import { TelaClassificarDemandaComponent } from './telas/demandas/tela-classificar-demanda/tela-classificar-demanda.component';
import { TelaChatComponent } from './telas/demandas/chat/tela-chat/tela-chat.component';
import { TelaPerfilComponent } from './telas/perfil/tela-perfil/tela-perfil.component';
import { TelaLoginComponent } from './telas/login/tela-login/tela-login.component';
import { TelaCorridaComponent } from './telas/demandas/geracao-proposta-ou-demanda/tela-corrida/tela-corrida.component';
import { AuthenticationChildGuard } from './security/authentication-child.guard';
import { NotFoundComponent } from './telas/not-found/not-found.component';
import { TelaConfigInicialComponent } from './telas/perfil/tela-config-inicial/tela-config-inicial.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: TelaLoginComponent,
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
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
            path: 'rascunho/:indiceRascunho',
            component: TelaCorridaComponent
          },
            {
              path: 'chat',
              component: TelaChatComponent,
              children: [
                {
                  path: ':codigoDemanda',
                  component: TelaChatComponent
                },
              ]
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
            path: 'not-found',
            component: NotFoundComponent
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
                path: 'ajuda',
                component: TelaAjudaComponent
              },
              {
                path: 'config-inicial',
                component: TelaConfigInicialComponent
              }
            ]
          },
          {
            path: '**',
            component: NotFoundComponent
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ],


})
export class RotasModule { }
