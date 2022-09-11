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



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
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
            path: 'sidebar',
            component: SidebarDemandaComponent
          },
        ]
      }
    ])
  ],
  exports:[
    RouterModule
  ],


})
export class RotasModule { }
