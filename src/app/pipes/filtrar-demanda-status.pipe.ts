import { Pipe, PipeTransform } from '@angular/core';
import { Demanda } from '../models/demanda.model';
import { StatusDemanda } from '../models/statusDemanda.enum';

@Pipe({
  name: 'filtrarDemandaStatus'
})
export class FiltrarDemandaStatusPipe implements PipeTransform {

  transform(demandas: Demanda[], ...titulo: string[]): Demanda[] {
    if(titulo[0] == "Backlog - Classificação"){
      let demandasFiltradas = demandas.filter(d => d.statusDemanda?.toString() == "BACKLOG_CLASSIFICACAO")
      demandasFiltradas.forEach(d => d.statusDemanda = StatusDemanda.BACKLOG_CLASSIFICACAO);
      return demandasFiltradas;
    }
    else if(titulo[0] == "Backlog - Aprovação"){
      let demandasFiltradas = demandas.filter(d => d.statusDemanda?.toString() == "BACKLOG_APROVACAO")
      demandasFiltradas.forEach(d => d.statusDemanda = StatusDemanda.BACKLOG_APROVACAO);
      return demandasFiltradas;
    }
    else if(titulo[0] == "Backlog - Propostas"){
      let demandasFiltradas = demandas.filter(d => d.statusDemanda?.toString() == "BACKLOG_PROPOSTA")
      demandasFiltradas.forEach(d => d.statusDemanda = StatusDemanda.BACKLOG_PROPOSTA);
      return demandasFiltradas;
    }
    else if(titulo[0] == "Assessment"){
      let demandasFiltradas = demandas.filter(d => d.statusDemanda?.toString() == "ASSESSMENT")
      demandasFiltradas.forEach(d => d.statusDemanda = StatusDemanda.ASSESSMENT);
      return demandasFiltradas;
    }
    else if(titulo[0] == "Business Case"){
      let demandasFiltradas = demandas.filter(d => d.statusDemanda?.toString() == "BUSINESS_CASE")
      demandasFiltradas.forEach(d => d.statusDemanda = StatusDemanda.BUSINESS_CASE);
      return demandasFiltradas;
    }
    else if(titulo[0] == "To Do"){
      let demandasFiltradas = demandas.filter(d => d.statusDemanda?.toString() == "TO_DO")
      demandasFiltradas.forEach(d => d.statusDemanda = StatusDemanda.TO_DO);
      return demandasFiltradas;
    }
    else if(titulo[0] == "Design and Build"){
      let demandasFiltradas = demandas.filter(d => d.statusDemanda?.toString() == "DESIGN_AND_BUILD")
      demandasFiltradas.forEach(d => d.statusDemanda = StatusDemanda.DESIGN_AND_BUILD);
      return demandasFiltradas;
    }
    else if(titulo[0] == "Support"){
      let demandasFiltradas = demandas.filter(d => d.statusDemanda?.toString() == "SUPPORT")
      demandasFiltradas.forEach(d => d.statusDemanda = StatusDemanda.SUPPORT);
      return demandasFiltradas;
    }
    else if(titulo[0] == "Cancelled"){
      let demandasFiltradas = demandas.filter(d => d.statusDemanda?.toString() == "CANCELLED")
      demandasFiltradas.forEach(d => d.statusDemanda = StatusDemanda.CANCELLED);
      return demandasFiltradas;
    }
    else if(titulo[0] == "Done"){
      let demandasFiltradas = demandas.filter(d => d.statusDemanda?.toString() == "DONE")
      demandasFiltradas.forEach(d => d.statusDemanda = StatusDemanda.DONE);
      return demandasFiltradas;
    }
    return demandas;
  }

}
