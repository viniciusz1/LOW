export let PermissoesDeRotas = [
    {
        path: '/tela-inicial',
        authorities: ["*"]
    },
    {
        path: '/tela-inicial/classificar-demanda',
        authorities: ["Analista", "GestorTI"]
    },
    {
        path: '/tela-inicial/rascunhos',
        authorities: ["*"]
    },
    {
        path: '/tela-inicial/not-found',
        authorities: ["*"]
    },
    {
        path: '/tela-inicial/chat',
        authorities: ["*"]
    },
    {
        path: '/tela-inicial/demanda',
        authorities: ["*"]
    },
    {
        path: '/tela-inicial/reformular-demanda',
        authorities: ["*"]
    },
    {
        path: '/tela-inicial/proposta',
        authorities: ["Analista", "GestorTI"]
    },
    {
        path: '/tela-inicial/reunioes',
        authorities: ["Analista", "GestorTI"]
    },
    {
        path: '/tela-inicial/ver-reuniao',
        authorities: ["Analista", "GestorTI"]
    },
    {
        path: '/tela-inicial/configuracoes/perfil',
        authorities: ["*"]
    },
    {
        path: '/tela-inicial/configuracoes/layout',
        authorities: ["*"]
    },
    {
        path: '/tela-inicial/configuracoes/sugestoes',
        authorities: ["*"]
    },
    {
        path: '/tela-inicial/configuracoes/ajuda',
        authorities: ["*"]
    }
]