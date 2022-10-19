import { TipoDespesa } from "./tipoDespesa.enum";

export interface Recurso {
    nomeRecurso: string,
    tipoDespesa: TipoDespesa,
    perfilDespesa: string,
    quantidadeHoras: number,
    valorHora: number,
    valorTotalDespesa: number,
    periodoExMeses: number,
    centrosCustoPagantes: []
}