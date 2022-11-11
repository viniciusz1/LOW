import { StatusDemanda } from './statusDemanda.enum';
import { Recurso } from "./recurso.model"
export interface Demanda {
    codigoDemanda?: string;
    tituloDemanda?: string,
    statusDemanda?: StatusDemanda,
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
    //Não tem nos inputs mas acredito que é necessário
    ppmDemanda?: string
    autorDemanda?: string
    departamentoBenDemanda?: string
}