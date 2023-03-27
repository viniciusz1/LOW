import { BusinessUnit } from './business-unit.model';
import { Tamanho } from './tamanho.enum';
import { Arquivo } from './arquivo.model';

import { CentroCusto } from 'src/app/models/centro-custo.model';
import { Beneficio } from './beneficio.model';
import { StatusDemanda } from './statusDemanda.enum';
import { Recurso } from "./recurso.model"
import { Usuario } from './usuario.model';
export interface Demanda {
    arquivosDemanda?: Arquivo[];
    codigoDemanda?: string;
    tituloDemanda?: string,
    statusDemanda?: StatusDemanda,
    situacaoAtualDemanda?: string,
    objetivoDemanda?: string,
    centroCustos?: CentroCusto[],
    beneficioRealDemanda?: Beneficio,
    beneficioPotencialDemanda?: Beneficio,
    beneficioQualitativoDemanda?: string,
    frequenciaDeUsoDemanda?: string,
    recursosNecessariosDemanda?:  [[Recurso], {'custoInterno': number, 'custoExterno': number, 'custoTotal': number}],
    escopoDemanda?: string,
    inicioExDemanda?: Date,
    fimExDemanda?: Date,
    paybackSimplesDemanda?: string,
    responsaveisNegocioDemanda?: [],
    parecerComissaoProposta?: string,
    ultimaDecisaoComissao?: string,
    tipoAtaProposta?: string,
    //Não tem nos inputs mas acredito que é necessário
    ppmDemanda?: string
    solicitanteDemanda?: Usuario
    departamentoBenDemanda?: string
    scoreDemanda?: number,
    dataCriacaoDemanda?: Date
    version?: number

    tamanhoDemandaAnalista?: Tamanho,
    buSolicitanteDemandaAnalista?: BusinessUnit,
    busBeneficiadasDemandaAnalista?: BusinessUnit[],
    secaoDemandaAnalista?: string,
    analista?: Usuario,
    gerenteNegocio?: Usuario
}
