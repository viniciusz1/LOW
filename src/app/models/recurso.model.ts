import { TipoDespesa } from "./tipoDespesa.enum";

export interface Recurso {
  codigoRecurso: string;
    nomeRecurso: string,
    tipoDespesaRecurso: TipoDespesa,
    perfilDespesaRecurso: string,
    quantidadeHorasRecurso: number,
    valorHoraRecurso: number,
    periodoExMesesRecurso: number,
    porcentagemCustoRecurso: [],
    centroDeCustoRecurso: []
}
