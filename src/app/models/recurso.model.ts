import { TipoDespesa } from "./tipoDespesa.enum";

export interface Recurso {
    id: string;
    nomeRecurso: string,
    tipoDespesa: TipoDespesa,
    perfilDespesa: string,
    quantidadeHoras: number,
    valorHora: number,
    valorTotalDespesa: number,
    periodoExMeses: number,
    centrosCustoPagantes: []
}