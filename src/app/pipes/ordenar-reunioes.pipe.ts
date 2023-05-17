import { Reuniao } from './../models/reuniao.model';
import { Pipe, PipeTransform } from '@angular/core';
import { Demanda } from '../models/demanda.model';
import { StatusDemanda } from '../models/statusDemanda.enum';
import { StatusReuniao } from '../models/statusReuniao.enum';

@Pipe({
  name: 'ordenarReuniaoPipe'
})

/*
  Pipe utilizado para reordenar a lista de reuniões da tela de reuniões, para que elas apa
  reçam de acordo com sua prioridade.
*/
export class OrdenarReuniaoPipe implements PipeTransform {

  transform(reuniao: Reuniao[]): Reuniao[] {
    console.log("No pipe")
    let novaLista: Reuniao[] = []
    novaLista.push(...reuniao.filter(e => e.statusReuniao == StatusReuniao.PROXIMO))
    novaLista.push(...reuniao.filter(e => e.statusReuniao == StatusReuniao.AGUARDANDO))
    novaLista.push(...reuniao.filter(e => e.statusReuniao == StatusReuniao.PENDENTE))
    novaLista.push(...reuniao.filter(e => e.statusReuniao == StatusReuniao.CONCLUIDO))
    novaLista.push(...reuniao.filter(e => e.statusReuniao == StatusReuniao.CANCELADO))
    return novaLista;
  }

}
