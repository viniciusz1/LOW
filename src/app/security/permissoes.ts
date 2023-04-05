export let PermissoesDeRotas = [
    {
        path: 'tela-inicial',
        authorities: ["*"]
    },
    {
        path: 'classificar-demanda/:codigoDemanda',
        authorities: ["Analista", "GestorTI"]
    },
    {
        path: 'rascunhos',
        authorities: ["*"]
    },
    {
        path: 'chat',
        authorities: ["*"]
    },
    {
        path: 'demanda',
        authorities: ["*"]
    },
    {
        path: 'reformular-demanda/:codigoDemanda',
        authorities: ["*"]
    },
    {
        path: 'proposta/:codigoDemanda',
        authorities: ["Analista", "GestorTI"]
    },
    {
        path: 'reunioes',
        authorities: ["Analista", "GestorTI"]
    },
    {
        path: 'ver-reuniao/:codigoReuniao',
        authorities: ["Analista", "GestorTI"]
    },
    {
        path: 'configuracoes/perfil',
        authorities: ["*"]
    },
    {
        path: 'configuracoes/layout',
        authorities: ["*"]
    },
    {
        path: 'configuracoes/sugestoes',
        authorities: ["*"]
    },
    {
        path: 'configuracoes/ajuda',
        authorities: ["*"]
    }
]