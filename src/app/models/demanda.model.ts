import { Recurso } from "./recurso.model"
export interface Demanda {
    tituloDemanda?: string,
    statusDemanda?: string,
    situacaoAtualDemanda?: string,
    objetivoDemanda?: string,
    centroDeCustoDemanda?: string[],
    beneficioRealDemanda?: number,
    beneficioPotencialDemanda?: number,
    beneficioQualitativoDemanda?: number,
    memoriaCalcBenRealDemanda?: string,
    memoriaCalcBenPotencialDemanda?: string,
    memoriaCalcBenQualitativoDemanda?: string,
    frequenciaDeUsoSistemaDemanda?: string,
    documentoDemanda?: string,
    recursosNecessariosDemanda?:  [[Recurso], {'custoInterno': number, 'custoExterno': number, 'custoTotal': number}],
    escopoDemanda?: string,
    inicioExDemanda?: Date,
    fimExDemanda?: Date,
    paybackSimplesDemanda?: string,
    responsaveisNegocioDemanda?: []
}