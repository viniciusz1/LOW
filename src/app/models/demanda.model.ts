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
  centroCustosDemanda?: CentroCusto[],
  beneficioRealDemanda?: Beneficio,
  beneficioPotencialDemanda?: Beneficio,
  beneficioQualitativoDemanda?: string,
  frequenciaDeUsoDemanda?: string,
  recursosProposta?: Recurso[],
  escopoDemanda?: string,
  inicioExDemandaProposta?: Date,
  fimExDemandaProposta?: Date,
  paybackProposta?: string,
  responsavelProposta?: [],
  parecerComissaoProposta?: string,
  ultimaDecisaoComissao?: string,
  tipoAtaProposta?: string,
  jiraProposta?: string,
  //Não tem nos inputs mas acredito que é necessário
  ppmDemanda?: string
  escopoDemandaProposta?: string,
  solicitanteDemanda?: Usuario
  departamentoBenDemanda?: string
  score?: number,
  dataCriacaoDemanda?: Date
  version?: number
  motivoReprovacaoDemanda?: string,

  isHistorico?: boolean,
  recomendacaoProposta?: string,
  tamanhoDemandaClassificada?: Tamanho,
  buSolicitanteDemandaClassificada?: string,
  busBeneficiadasDemandaClassificada?: string[],
  secaoDemandaClassificada?: string,
  analista?: Usuario,
  gerenteNegocio?: Usuario
  horaUltimaMensagem?: Date
  qtdMensagensNaoLidas?: number
  //usuario aguardando a mensagem ser visualizada
  usuarioAguardando?: Usuario
  parecerDGProposta?: string
  decisaoDG?: string
  numAtaDG?: string
  arquivoDG?: Arquivo
  usuariosFavoritos?: Usuario[]
}
