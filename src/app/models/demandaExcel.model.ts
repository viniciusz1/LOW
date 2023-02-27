import { Arquivo } from './arquivo.model';

import { CentroCusto } from 'src/app/models/centro-custo.model';
import { Beneficio } from './beneficio.model';
import { StatusDemanda } from './statusDemanda.enum';
import { Recurso } from './recurso.model';
import { Usuario } from './usuario.model';
export interface DemandaExcel {
  arquivosDemanda?: Arquivo[];
  codigoDemanda?: string;
  tituloDemanda?: string;
  statusDemanda?: StatusDemanda;
  situacaoAtualDemanda?: string;
  objetivoDemanda?: string;
  codigoCentroCusto?: string;
  nomeCentroCusto?: string;
  codigoBeneficioReal?: number;
  moedaBeneficioReal?: string;
  memoriaDeCalculoBeneficioReal?: string;
  valorBeneficioReal?: number;
  codigoBeneficioPotencial?: number;
  moedaBeneficioPotencial?: string;
  memoriaDeCalculoBeneficioPotencial?: string;
  valorBeneficioPotencial?: number;
  beneficioQualitativoDemanda?: string;
  frequenciaDeUsoSistemaDemanda?: string;
  nomeSolicitante?: string

  recursosNecessariosDemanda?: [
    [Recurso],
    { custoInterno: number; custoExterno: number; custoTotal: number }
  ];
  escopoDemanda?: string;
  inicioExDemanda?: Date;
  fimExDemanda?: Date;
  paybackSimplesDemanda?: string;
  responsaveisNegocioDemanda?: [];
  //Não tem nos inputs mas acredito que é necessário
  ppmDemanda?: string;
  solicitanteDemanda?: Usuario;
  departamentoBenDemanda?: string;
  scoreDemanda?: number;
}
