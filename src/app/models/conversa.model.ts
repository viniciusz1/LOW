import { Demanda } from "./demanda.model";
import { Mensagem } from "./message.model";
import { Usuario } from "./usuario.model";

export interface Conversa{
    codigoConversa?: number
    mensagemConversa?: Mensagem
    usuariosConversa?: Usuario[]
    demandaConversa?: Demanda
    conversaAtiva?: boolean
    qtdMensagensNaoLidas?: number
    horaUltimaMensagem?: Date
    usuarioAguardando?: Usuario

}