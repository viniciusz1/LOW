import { BusinessUnit } from './business-unit.model';
import { Tamanho } from './tamanho.enum';
import { Demanda } from './demanda.model';
import { Usuario } from './usuario.model';

export interface DemandaAnalista {
    codigoDemandaAnalista?: string;
    tamanhoDemandaAnalista?: Tamanho,
    buSolicitanteDemandaAnalista?: BusinessUnit,
    busBeneficiadasDemandaAnalista?: BusinessUnit[],
    secaoDemandaAnalista?: string,
    demandaDemandaAnalista?: Demanda,
    analista?: Usuario,
    gerenteNegocio?: Usuario 
}
