import { Pipe, PipeTransform } from '@angular/core';
import { Demanda } from '../models/demanda.model';
import { filter } from 'rxjs';

@Pipe({
  name: 'filtrarChat'
})
export class FiltrarChatPipe implements PipeTransform {

  transform(demandas: Demanda[], titulo: string): Demanda[] {
    return demandas.filter(demanda => {
      if (!demanda.tituloDemanda) return demandas
      return demanda.tituloDemanda.toLowerCase().includes(titulo.toLowerCase())
    });
  }

}
