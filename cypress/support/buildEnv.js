const buildEnv = () => {
  cy.server()

  cy.route({
    method: 'POST',
    url: '/signin',
    response: {
      id: 11813,
      nome: 'User Mokado',
      token: ''
    }
  })

  cy.route({
    method: 'GET',
    url: '/saldo',
    response: [
      {
        conta_id: 999,
        conta: 'Carteira',
        saldo: '100.00'
      },
      {
        conta_id: 9909,
        conta: 'Banco',
        saldo: '10000000.00'
      }
    ]
  })
  cy.route({
    method: 'GET',
    url: '/contas',
    response: [
      {
        id: 1,
        nome: 'Carteira',
        visivel: true,
        usuario_id: 1
      },
      {
        id: 2,
        nome: 'Banco',
        visivel: true,
        usuario_id: 11813
      },
      {
        id: 3,
        nome: 'Conta para alterar',
        visivel: true,
        usuario_id: 3
      },
      {
        id: 4,
        nome: 'Conta mesmo nome',
        visivel: true,
        usuario_id: 4
      }

    ]
  })

  cy.route({
    method: 'GET',
    url: '/extrato/**',
    response: [
      {
        conta: 'Conta para movimentacoes',
        id: 249129,
        descricao: 'Movimentacao para exclusao',
        envolvido: 'AAA',
        observacao: null,
        tipo: 'DESP',
        data_transacao: '2020-09-24T03:00:00.000Z',
        data_pagamento: '2020-09-24T03:00:00.000Z',
        valor: '-1500.00',
        status: true,
        conta_id: 275972,
        usuario_id: 11813,
        transferencia_id: null,
        parcelamento_id: null
      },
      {
        conta: 'Conta com movimentacao',
        id: 249130,
        descricao: 'Movimentacao de conta',
        envolvido: 'BBB',
        observacao: null,
        tipo: 'DESP',
        data_transacao: '2020-09-24T03:00:00.000Z',
        data_pagamento: '2020-09-24T03:00:00.000Z',
        valor: '-1500.00',
        status: true,
        conta_id: 275973,
        usuario_id: 11813,
        transferencia_id: null,
        parcelamento_id: null
      },
      {
        conta: 'Conta para saldo',
        id: 249131,
        descricao: 'Movimentacao 1, calculo saldo',
        envolvido: 'CCC',
        observacao: null,
        tipo: 'REC',
        data_transacao: '2020-09-24T03:00:00.000Z',
        data_pagamento: '2020-09-24T03:00:00.000Z',
        valor: '3500.00',
        status: false,
        conta_id: 275974,
        usuario_id: 11813,
        transferencia_id: null,
        parcelamento_id: null
      },
      {
        conta: 'Conta para saldo',
        id: 249132,
        descricao: 'Movimentacao 2, calculo saldo',
        envolvido: 'DDD',
        observacao: null,
        tipo: 'DESP',
        data_transacao: '2020-09-24T03:00:00.000Z',
        data_pagamento: '2020-09-24T03:00:00.000Z',
        valor: '-1000.00',
        status: true,
        conta_id: 275974,
        usuario_id: 11813,
        transferencia_id: null,
        parcelamento_id: null
      },
      {
        conta: 'Conta para saldo',
        id: 249133,
        descricao: 'Movimentacao 3, calculo saldo',
        envolvido: 'EEE',
        observacao: null,
        tipo: 'REC',
        data_transacao: '2020-09-24T03:00:00.000Z',
        data_pagamento: '2020-09-24T03:00:00.000Z',
        valor: '1534.00',
        status: true,
        conta_id: 275974,
        usuario_id: 11813,
        transferencia_id: null,
        parcelamento_id: null
      },
      {
        conta: 'Conta para extrato',
        id: 249134,
        descricao: 'Movimentacao para extrato',
        envolvido: 'FFF',
        observacao: null,
        tipo: 'DESP',
        data_transacao: '2020-09-24T03:00:00.000Z',
        data_pagamento: '2020-09-24T03:00:00.000Z',
        valor: '-220.00',
        status: true,
        conta_id: 275975,
        usuario_id: 11813,
        transferencia_id: null,
        parcelamento_id: null
      }
    ]
  })
}

export default buildEnv
