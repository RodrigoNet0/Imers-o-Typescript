type Pagamentos = {
    empresa: string,
    data: string,
    valor: number,
    tipo: 'pagamento'
}

type Transferencias = {
    origin: string,
    data: string,
    valor: number,
    tipo: 'transferencia'
}

type FaturaEmAberto = {
    numeroDoCartao: string,
    total: number,
    vencimento: string,
    tipo: 'fatura'
}

type Notificacao = Transferencias | Pagamentos | FaturaEmAberto;

type NotificacaoNormalizada = {
    titulo: string,
    mensagem: string, // Corrigi "mensage" para "mensagem"
    data: string,
    valor: number
};

let pagamentos: Pagamentos[] = [
    {
        empresa: 'Habibs',
        data: '2023-05-03',
        valor: 30.50,
        tipo: 'pagamento'
    },
    {
        empresa: 'Habibs',
        data: '2023-05-03',
        valor: 30.50,
        tipo: 'pagamento'
    }
];

let transferencia: Transferencias[] = [
    {
        origin: 'Jv',
        valor: 200,
        data: '2023-09-23',
        tipo: 'transferencia'
    }
];

let faturaEmAberto: FaturaEmAberto[] = [
    {
        numeroDoCartao: '1243',
        total: 123,
        vencimento: '2023-09-09',
        tipo: 'fatura'
    }
];

let notificacoes: Notificacao[] = [
    ...pagamentos,
    ...transferencia,
    ...faturaEmAberto
];

function normalizaNotificacao(notificacoes: Notificacao[]): NotificacaoNormalizada[] {
    return notificacoes.map(notificacao => {
        if (notificacao.tipo === 'fatura') {
            return {
                titulo: notificacao.numeroDoCartao,
                mensagem: `Fatura em aberto no valor de R$${notificacao.total.toFixed(2)}`,
                data: notificacao.vencimento,
                valor: notificacao.total
            };
        }

        if (notificacao.tipo === 'pagamento') {
            return {
                titulo: notificacao.empresa,
                mensagem: `Pagamento no valor de R$${notificacao.valor.toFixed(2)}`,
                data: notificacao.data,
                valor: notificacao.valor
            };
        }

        if (notificacao.tipo === 'transferencia') {
            return {
                titulo: 'Transferência Recebida',
                mensagem: `Transferência de R$${notificacao.valor.toFixed(2)} recebida de ${notificacao.origin}`,
                data: notificacao.data,
                valor: notificacao.valor
            };
        }
        
        // Adicione um tratamento para tipos desconhecidos, se necessário.
        return {
            titulo: 'Tipo Desconhecido',
            mensagem: 'Tipo de notificação desconhecido',
            data: '',
            valor: 0
        };
    });
}
