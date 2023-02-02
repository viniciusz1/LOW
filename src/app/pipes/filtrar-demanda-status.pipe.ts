import { Pipe, PipeTransform } from '@angular/core';
import { Demanda } from '../models/demanda.model';
import { StatusDemanda } from '../models/statusDemanda.enum';

@Pipe({
  name: 'filtrarDemandaStatus'
})
export class FiltrarDemandaStatusPipe implements PipeTransform {

  transform(demandas: Demanda[], ...titulo: string[]): Demanda[] {
    if(titulo[0] == "Backlog - Classificação"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO)
    }
    else if(titulo[0] == "Backlog - Aprovação"){
      return demandas.filter(d => d.statusDemanda  == StatusDemanda.BACKLOG_APROVACAO)
    }
    else if(titulo[0] == "Backlog - Propostas"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA)
    }
    else if(titulo[0] == "Assessment"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.ASSESSMENT)
    }
    else if(titulo[0] == "Business Case"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.BUSINESS_CASE)
    }
    else if(titulo[0] == "To Do"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.TO_DO)
    }
    else if(titulo[0] == "Design and Build"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.DESIGN_AND_BUILD)
    }
    else if(titulo[0] == "Support"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.SUPPORT)
    }
    else if(titulo[0] == "Cancelled"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.CANCELLED)
    }
    else if(titulo[0] == "Done"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.DONE)
    }
    return demandas;
  }

}
