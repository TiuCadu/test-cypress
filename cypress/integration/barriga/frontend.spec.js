/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Should test a funcional level', () => {
  after(() => {
    cy.clearLocalStorage().as('Clear Local Storage')
  })

  before(() => {
  })

  beforeEach(() => {
    buildEnv()
    cy.login('carlos.oliveira@fofurex.com', '12345')
    cy.get(loc.MENU.HOME).click()
  })

  it('Should validate data send to create an account', () => {
    cy.route({
      method: 'POST',
      url: '/contas',
      response: {
        id: 1,
        nome: 'Conta Teste',
        visivel: true,
        usuario_id: 1
      },
      onRequest: req => {
        // eslint-disable-next-line no-unused-expressions
        expect(req.request.body.nome).to.be.not.empty
        expect(req.request.headers).to.have.property('Authorization')
      }
    }).as('saveConta')
    cy.acessarMenuConta()
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
          usuario_id: 2
        },
        {
          id: 3,
          nome: 'Conta Teste',
          visivel: true,
          usuario_id: 3
        }

      ]
    })
    cy.inserirConta('Conta Teste')
    cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')
    cy.containsMessage('Conta inserida com sucesso!')
  })

  it('Should update an account', () => {
    cy.route({
      // NOTE - Colocando dois ** para id
      method: 'PUT',
      url: '/contas/**',
      response: {
        id: 274704,
        nome: 'Conta teste',
        visivel: true,
        usuario_id: 11813
      }
    })
    cy.acessarMenuConta()
    cy.get(loc.CONTAS.FN_CSS_BUSCA_BOTAO_ALTERAR('Conta para alterar')).click()
    cy.get(loc.CONTAS.NOME).clear().type('Conta para alterar')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.containsMessage('Conta atualizada com sucesso!')
  })

  it('Should not create an account with the same name', () => {
    cy.route({
      method: 'POST',
      url: '/contas',
      response: {
        error: 'Já existe uma conta com esse nome!',
        status: 400
      }
    })
    cy.acessarMenuConta()
    cy.inserirConta('Conta mesmo nome')
    // cy.containsMessage('code 400')
  })
  it('should create a transaction', () => {
    cy.route({
      method: 'POST',
      url: '/transacoes',
      response: {
        id: 249127,
        descricao: 'Desc',
        envolvido: 'Inter',
        observacao: null,
        tipo: 'REC',
        data_transacao: '2020-09-24T03:00:00.000Z',
        data_pagamento: '2020-09-24T03:00:00.000Z',
        valor: '500.00',
        status: true,
        conta_id: 274704,
        usuario_id: 11813,
        transferencia_id: null,
        parcelamento_id: null
      }
    })
    // NOTE - Usando fixture
    cy.route({
      method: 'GET',
      url: '/extrato/**',
      response: 'fixture:movimentacaoSalva'
    })
    cy.get(loc.MENU.MOVIMENTACAO).click()
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
    cy.get(loc.MOVIMENTACAO.VALOR).type('500')
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
    cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    cy.containsMessage('sucesso')

    cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
    cy.get(loc.EXTRATO.FN_CSS_BUSCA_ELEMENTO('Desc', '500')).should('exist')
  })
  it('should get balance', () => {
    cy.get(loc.MENU.HOME).click()
    cy.get(loc.SALDO.FN_CSS_BUSCA_SALDO_CONTA('Carteira', '100')).should('exist')
  })

  it('Should remove a transaction', () => {
    cy.route({
      method: 'DELETE',
      url: '/transacoes/**',
      response: {},
      status: 204
    })
    cy.get(loc.MENU.EXTRATO).click()
    cy.get(loc.EXTRATO.FN_CSS_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
    cy.containsMessage('removida')
  })
  it('Should test colors', () => {
    cy.route({
      method: 'GET',
      url: '/extrato/**',
      response: [
        {
          conta: 'Conta para movimentacoes',
          id: 249129,
          descricao: 'Receita Paga',
          envolvido: 'AAA',
          observacao: null,
          tipo: 'REC',
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
          descricao: 'Receita Pendente',
          envolvido: 'BBB',
          observacao: null,
          tipo: 'REC',
          data_transacao: '2020-09-24T03:00:00.000Z',
          data_pagamento: '2020-09-24T03:00:00.000Z',
          valor: '-1500.00',
          status: false,
          conta_id: 275973,
          usuario_id: 11813,
          transferencia_id: null,
          parcelamento_id: null
        },
        {
          conta: 'Conta para saldo',
          id: 249131,
          descricao: 'Despesa Paga',
          envolvido: 'CCC',
          observacao: null,
          tipo: 'DESP',
          data_transacao: '2020-09-24T03:00:00.000Z',
          data_pagamento: '2020-09-24T03:00:00.000Z',
          valor: '3500.00',
          status: true,
          conta_id: 275974,
          usuario_id: 11813,
          transferencia_id: null,
          parcelamento_id: null
        },
        {
          conta: 'Conta para saldo',
          id: 249132,
          descricao: 'Despesa pendente',
          envolvido: 'DDD',
          observacao: null,
          tipo: 'DESP',
          data_transacao: '2020-09-24T03:00:00.000Z',
          data_pagamento: '2020-09-24T03:00:00.000Z',
          valor: '-1000.00',
          status: false,
          conta_id: 275974,
          usuario_id: 11813,
          transferencia_id: null,
          parcelamento_id: null
        }
      ]
    })

    cy.get(loc.MENU.EXTRATO).click()
  })
  it.only('Should test the responsiveness', () => {
    cy.get('[data-test=menu-home]').should('exist').and('be.visible')
    cy.viewport('iphone-6')
    cy.get('[data-test=menu-home]').should('exist').and('not.be.visible')
  })
})
