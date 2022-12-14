import { Reuniao } from "src/app/models/reuniao.model";
import { StatusReuniao } from "src/app/models/statusReuniao.enum";
import { Demanda } from "src/app/models/demanda.model";
import { StatusDemanda } from "src/app/models/statusDemanda.enum";

let propostas: Demanda[] = [
  {
    autorDemanda: "Sabrina Hegmann",
    scoreDemanda: 2034,
    statusDemanda: StatusDemanda.CANCELLED,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
    ppmDemanda: "PPM 123456",
  }, {
    autorDemanda: "Sabrina Hegmann",
    scoreDemanda: 2034,
    statusDemanda: StatusDemanda.TO_DO,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
    ppmDemanda: "PPM 123456",
  }, {
    autorDemanda: "Sabrina Hegmann",
    scoreDemanda: 2034,
    statusDemanda: StatusDemanda.BUSINESS_CASE,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
    ppmDemanda: "PPM 123456",
  }, {
    autorDemanda: "Sabrina Hegmann",
    scoreDemanda: 2034,
    statusDemanda: StatusDemanda.DONE,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
    ppmDemanda: "PPM 123456",
  }, {
    autorDemanda: "Sabrina Hegmann",
    scoreDemanda: 2034,
    statusDemanda: StatusDemanda.SUPPORT,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
    ppmDemanda: "PPM 123456",
  }
]

// propostas?: Demanda[],
//     diaReuniao?: Date,
//     nomeComissao?: string
//     statusReuniao?: StatusReuniao

export const listaReunioes: Reuniao[] = [

  {
    propostas: propostas,
    diaReuniao: new Date(),
    nomeComissao: "Drive",
    statusReuniao: StatusReuniao.PROXIMO
  },
  {
    propostas: propostas,
    diaReuniao: new Date(),
    nomeComissao: "HP",
    statusReuniao: StatusReuniao.PENDENTE
  },
  {
    propostas: propostas,
    diaReuniao: new Date(),
    nomeComissao: "WEG Digital",
    statusReuniao: StatusReuniao.AGUARDANDO
  },

  {
    propostas: propostas,
    diaReuniao: new Date(),
    nomeComissao: "WEG Digital",
    statusReuniao: StatusReuniao.CONCLUIDO
  },
  {
    propostas: propostas,
    diaReuniao: new Date(),
    nomeComissao: "Drive",
    statusReuniao: StatusReuniao.CANCELADO
  }

]