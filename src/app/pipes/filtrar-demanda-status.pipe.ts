import { Inject, Injectable, Pipe, PipeTransform } from '@angular/core';
import { Demanda } from '../models/demanda.model';
import { StatusDemanda } from '../models/statusDemanda.enum';
import { UsuarioService } from '../services/usuario.service';
@Injectable()
@Pipe({
  name: 'filtrarDemandaStatus'
})

/*
  Pipe utilizado para realizar a tela principal do sistema. Ele basicamente recebe uma lista
  com todas as demandas que devem ser exibidas na tela inicial, e também uma lista com os tí
  tulos que são exibidos. Após isso, ela filtra as demandas que devem ser exibidas para cada
  título e então, retorna uma fileira de demandas de status correspondentes.
*/

export class FiltrarDemandaStatusPipe implements PipeTransform {
  constructor(private usuarioService: UsuarioService) {

  }


  transform(demandas: Demanda[], ...titulo: string[]): Demanda[] | undefined {

    if(titulo[0] == "Sem demandas"){
      return undefined
    }
    if(titulo[0] == "Favoritos"){
      return demandas.filter((e) => {
        if(e.usuariosFavoritos)
        for(let i of e.usuariosFavoritos){
          if(i.codigoUsuario == this.usuarioService.getCodigoUser()){
            return true;
          }
        }
        return false;
      })    

    }

    if (titulo[0] == "Suas Demandas") {
      return demandas.filter(d => d.solicitanteDemanda?.codigoUsuario == this.usuarioService.getCodigoUser())
    }

    if (titulo[0] == "Suas Tarefas" && this.usuarioService.getRole == 'GerenteNegocio') {
      return demandas.filter(d => d.statusDemanda == StatusDemanda.BACKLOG_APROVACAO)
    }

    if (titulo[0] == "Demandas do Seu Departamento") {
      return demandas.filter(d => d.statusDemanda != StatusDemanda.DRAFT)
    }
    //Caso as demadas sejam do analista, não devem ficar no fluxo principal (que correspodem a suas tarefas ou ações possiveis)
    if(this.usuarioService.getRole == 'Analista'){
    demandas = demandas.filter(d => d.solicitanteDemanda?.codigoUsuario != this.usuarioService.getCodigoUser())
    }
    if (titulo[0] == "Backlog - Classificação") {
      return demandas.filter(d => d.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO)
    }
    if (titulo[0] == "Backlog - Aprovação") {
      return demandas.filter(d => d.statusDemanda == StatusDemanda.BACKLOG_APROVACAO)
    }

    else if (titulo[0] == "Backlog - Propostas") {
      return demandas.filter(d => d.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA)
    }
    else if (titulo[0] == "Assessment") {
      return demandas.filter(d => d.statusDemanda == StatusDemanda.ASSESSMENT)
    }
    else if (titulo[0] == "Business Case") {
      return demandas.filter(d => d.statusDemanda == StatusDemanda.BUSINESS_CASE)
    }
    else if (titulo[0] == "Discussion") {
      return demandas.filter(d => d.statusDemanda == StatusDemanda.DISCUSSION)
    }
    else if (titulo[0] == "To Do") {
      return demandas.filter(d => d.statusDemanda == StatusDemanda.TO_DO)
    }
    else if (titulo[0] == "Design and Build") {
      return demandas.filter(d => d.statusDemanda == StatusDemanda.DESIGN_AND_BUILD)
    }
    else if (titulo[0] == "Support") {
      return demandas.filter(d => d.statusDemanda == StatusDemanda.SUPPORT)
    }
    else if (titulo[0] == "Cancelled") {
      return demandas.filter(d => d.statusDemanda == StatusDemanda.CANCELLED)
    }
    else if (titulo[0] == "Done") {
      return demandas.filter(d => d.statusDemanda == StatusDemanda.DONE)
    }

    return demandas;
  }
}
