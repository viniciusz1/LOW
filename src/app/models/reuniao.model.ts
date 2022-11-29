import { StatusReuniao } from './statusReuniao.enum';
import { Demanda } from './demanda.model';
export interface Reuniao {

    propostas?: Demanda[],
    diaReuniao?: Date,
    nomeComissao?: string
    statusReuniao?: StatusReuniao

}