import { CentroCusto } from "./centro-custo.model";
import { TipoDespesa } from "./tipoDespesa.enum";

export interface Recurso {
  codigoRecurso: string;
    nomeRecurso: string,
    tipoDespesaRecurso: TipoDespesa,
    perfilDespesaRecurso: string,
    quantidadeHorasRecurso: number,
    valorHoraRecurso: number,
    periodoExMesesRecurso: number,
    centroCustoRecurso: CentroCusto[]
}
