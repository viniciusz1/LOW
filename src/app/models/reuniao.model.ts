import { StatusReuniao } from './statusReuniao.enum';
import { Proposta } from './proposta.model';
import { Comissao } from './comissao.model';
import { Demanda } from './demanda.model';
export interface Reuniao {

    dataReuniao?: Date,
    comissaoReuniao?: Comissao,
    ataReuniao?: string,
    statusReuniao?: StatusReuniao,
    codigoReuniao?: number,
    //enviado para o back
    demandasReuniao?: Demanda[],
    //recebido pelo back
    propostasReuniao?: Proposta[] | Demanda[],

}