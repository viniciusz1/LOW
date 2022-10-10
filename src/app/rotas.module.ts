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
<<<<<<< HEAD
import { TelaLoginComponent } from './telas/login/tela-login/tela-login.component';
=======
import { TelaEtapaDoisComponent } from './telas/demandas/geracao-proposta-ou-demanda/tela-etapa-dois/tela-etapa-dois.component';
import { TelaEtapaTresComponent } from './telas/demandas/geracao-proposta-ou-demanda/tela-etapa-tres/tela-etapa-tres.component';
>>>>>>> 897478d7cc6f6838d095d846c8d917e0c31fb1d5



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
