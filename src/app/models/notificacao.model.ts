import { TipoNotificacao } from "./tipoNotificacao.enum";

export interface Notificacao {
  codigoNotificacao: number,
  tituloDemandaNotificacao: string,
  tipoNotificacao: TipoNotificacao,
  descricaoNotificacao: string,
  dataNotificacao: Date,
  statusNotificacao: string,
  lido: Boolean
}

