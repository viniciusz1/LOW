import { Demanda } from "./demanda.model"
import { Usuario } from "./usuario.model"

export interface Mensagem {
    codigoMensagens?:number
    demandaMensagens?: Demanda
    textoMensagens: string
    usuarioMensagens?: Usuario
    ladoMensagem: boolean
  }
  