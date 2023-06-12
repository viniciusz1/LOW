import { Demanda } from "./demanda.model"
import { Usuario } from "./usuario.model"

export interface Mensagem {
    codigoMensagem?:number
    demandaMensagem?: Demanda
    textoMensagem: string
    usuarioMensagem?: Usuario
    ladoMensagem: boolean
    dataMensagem?: Date
    statusMensagem?: string
  }
  