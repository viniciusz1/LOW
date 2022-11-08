import { Pipe, PipeTransform } from '@angular/core';
import { Demanda } from '../models/demanda.model';
import { StatusDemanda } from '../models/statusDemanda.enum';

@Pipe({
  name: 'filtrarDemandaStatus'
})
export class FiltrarDemandaStatusPipe implements PipeTransform {

  transform(demandas: Demanda[], ...titulo: string[]): Demanda[] {
    if(titulo[0] == "STATUS: Backlog - Classificação"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.BACKLOG)
    }
    if(titulo[0] == "Status: Backlog - Propostas"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.BACKLOG)
    }
    if(titulo[0] == "Status: Assessment"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.ASSESSMENT)
    }
    if(titulo[0] == "Status: Business Case"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.BUSINESS_CASE)
    }
    if(titulo[0] == "Status: To Do"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.TO_DO)
    }
    if(titulo[0] == "Status: Design and Build"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.DESIGN_AND_BUILD)
    }
    if(titulo[0] == "Status: Support"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.SUPPORT)
    }
    if(titulo[0] == "Status: Cancelled"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.CANCELLED)
    }
    if(titulo[0] == "Status: Done"){
      return demandas.filter(d => d.statusDemanda == StatusDemanda.DONE)
    }
    return demandas;
  }

}
