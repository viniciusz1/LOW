import { DemandaAnalista } from "./demanda-analista.model";
import { Usuario } from "./usuario.model";
import { Recurso } from "./recurso.model";

export interface Proposta {
    codigoProposta?: number;
    prazoProposta?: Date,
    ppmProposta?: number,
    jiraProposta?: string,
    inicioExDemandaProposta?: Date,
    fimExDemandaProposta?: Date,
    paybackProposta?: number,
    responsavelProposta?: Usuario,
    demandaAnalistaProposta?: DemandaAnalista,
    recursosProposta?: Recurso[]

}