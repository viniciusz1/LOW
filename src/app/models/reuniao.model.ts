import { StatusReuniao } from './statusReuniao.enum';
import { Proposta } from './proposta.model';
import { Demanda } from './demanda.model';
import { Arquivo } from './arquivo.model';
export interface Reuniao {

  dataReuniao?: Date,
  comissaoReuniao?: string,
  ataReuniao?: string,
  statusReuniao?: StatusReuniao,
  codigoReuniao?: number,
  //enviado para o back
  motivoCancelamentoReuniao?: string,
  propostasReuniao?: Demanda[],
  numAtaDG?: string,
  arquivoReuniao?: Arquivo
}
