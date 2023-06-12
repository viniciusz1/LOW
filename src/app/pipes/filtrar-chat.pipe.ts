import { Pipe, PipeTransform } from '@angular/core';
import { Demanda } from '../models/demanda.model';
import { filter } from 'rxjs';
import { Conversa } from '../models/conversa.model';

@Pipe({
  name: 'filtrarChat'
})
export class FiltrarChatPipe implements PipeTransform {

  transform(conversas: Conversa[], titulo: string): Conversa[] {
    return conversas.filter(conversa => {
      if (!conversa.demandaConversa?.tituloDemanda) return conversas
      return conversa.demandaConversa?.tituloDemanda.toLowerCase().includes(titulo.toLowerCase())
    });
  }

}
