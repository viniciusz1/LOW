import { Reuniao } from "src/app/models/reuniao.model";
import { StatusReuniao } from "src/app/models/statusReuniao.enum";
import { Demanda } from "src/app/models/demanda.model";
import { StatusDemanda } from "src/app/models/statusDemanda.enum";
import { Comissao } from "src/app/models/comissao.model";

let propostas: Demanda[] = [
  {

    scoreDemanda: 2034,
    statusDemanda: StatusDemanda.CANCELLED,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
    ppmDemanda: "PPM 123456",
  }, {

    scoreDemanda: 2034,
    statusDemanda: StatusDemanda.TO_DO,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
    ppmDemanda: "PPM 123456",
  }, {

    scoreDemanda: 2034,
    statusDemanda: StatusDemanda.BUSINESS_CASE,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
    ppmDemanda: "PPM 123456",
  }, {

    scoreDemanda: 2034,
    statusDemanda: StatusDemanda.DONE,
    departamentoBenDemanda: "Tecnologia da Informação",
    tituloDemanda: "Sistema de Gestão de Demandas",
    ppmDemanda: "PPM 123456",
  }, {

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

// export const listaReunioes: Reuniao[] = [

//   {
//     propostasReuniao: propostas,
//     dataReuniao: new Date(),
//     comissaoReuniao: {nomeComissao: "Drive"} as Comissao,
//     statusReuniao: StatusReuniao.PROXIMO
//   },
//   {
//     propostasReuniao: propostas,
//     dataReuniao: new Date(),
//     comissaoReuniao: {nomeComissao: "HP"} as Comissao,
//     statusReuniao: StatusReuniao.PENDENTE
//   },
//   {
//     propostasReuniao: propostas,
//     dataReuniao: new Date(),
//     comissaoReuniao: {nomeComissao: "WEG Digital"} as Comissao,
//     statusReuniao: StatusReuniao.AGUARDANDO
//   },

//   {
//     propostasReuniao: propostas,
//     dataReuniao: new Date(),
//     comissaoReuniao: {nomeComissao: "WEG Digital"} as Comissao,
//     statusReuniao: StatusReuniao.CONCLUIDO
//   },
//   {
//     propostasReuniao: propostas,
//     dataReuniao: new Date(),
//     comissaoReuniao: {nomeComissao: "Drive"} as Comissao,
//     statusReuniao: StatusReuniao.CANCELADO
//   }
// 
// ]
