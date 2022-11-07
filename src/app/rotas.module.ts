import { TelaReuniaoComponent } from './telas/reunioes/tela-reuniao/tela-reuniao.component';
import { TelaEtapaCincoComponent } from './telas/demandas/geracao-proposta-ou-demanda/tela-etapa-cinco/tela-etapa-cinco.component';
import { TelaVerPauta } from './telas/reunioes/tela-ver-pauta/tela-ver-pauta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EscopoPrincipalComponent } from './componentes-fixos/escopo-principal/escopo-principal.component';
import { TelaInicialComponent } from './telas/demandas/tela-inicial/tela-inicial.component';
import { TelaClassificarDemandaComponent } from './telas/demandas/tela-classificar-demanda/tela-classificar-demanda.component';
import { TelaHistoricoDemandaComponent } from './telas/demandas/tela-historico-demanda/tela-historico-demanda.component';
import { TelaChatComponent } from './telas/demandas/chat/tela-chat/tela-chat.component';
import { TelaPerfilComponent } from './telas/perfil/tela-perfil/tela-perfil.component';
import { TelaEtapaUmComponent } from './telas/demandas/geracao-proposta-ou-demanda/tela-etapa-um/tela-etapa-um.component';
import { SidebarDemandaComponent } from './componentes-reutilizaveis/sidebar-demanda/sidebar-demanda.component';
import { TelaEtapaQuatroComponent } from './telas/demandas/geracao-proposta-ou-demanda/tela-etapa-quatro/tela-etapa-quatro.component';
import { TelaLoginComponent } from './telas/login/tela-login/tela-login.component';
import { TelaEtapaDoisComponent } from './telas/demandas/geracao-proposta-ou-demanda/tela-etapa-dois/tela-etapa-dois.component';
import { TelaEtapaTresComponent } from './telas/demandas/geracao-proposta-ou-demanda/tela-etapa-tres/tela-etapa-tres.component';
import { RascunhosComponent } from './telas/demandas/rascunhos/rascunhos.component';


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
        children: [
          {
            path: '',
            component: TelaInicialComponent
          },
          {
            path: 'classificar-demanda',
            component: TelaClassificarDemandaComponent
          },
          {
            path: 'historico-demanda',
            component: TelaHistoricoDemandaComponent
          },
          {
            path: 'chat',
            component: TelaChatComponent
          },
          {
            path: 'perfil',
            component: TelaPerfilComponent
          },
          {
            path: 'proposta/1',
            component: TelaEtapaUmComponent
          },
          {
            path: 'proposta/2',
            component: TelaEtapaDoisComponent
          },
          {
            path: 'proposta/3',
            component: TelaEtapaTresComponent
          },
          {
            path: 'proposta/4',
            component: TelaEtapaQuatroComponent
          },
          {
            path: 'sidebar',
            component: SidebarDemandaComponent

          },
          {
            path: 'data-comissao',
            component: TelaReuniaoComponent
          },
          {
            path: 'ver-pauta',
            component: TelaVerPauta
          },
          {
            path: 'proposta/5',
            component: TelaEtapaCincoComponent
          },
          {
            path: 'rascunhos',
            component: RascunhosComponent
          }
        ]
      }
    ])
  ],
  exports:[
    RouterModule
  ],


})
export class RotasModule { }
