/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test a funcional level', () => {
  before(() => {
    cy.login('carlos.oliveira@fofurex.com', '123456')
    cy.resetApp()
  })

  beforeEach(() => {
    cy.get(loc.MENU.HOME).click()
  })

  it('Should create an account', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta Teste')
    cy.containsMessage('Conta inserida com sucesso!')
  })

  it.only('Should update an account', () => {
    cy.acessarMenuConta()
    cy.get(loc.CONTAS.FN_CSS_BUSCA_BOTAO_ALTERAR('Conta para alterar')).click()
    cy.get(loc.CONTAS.NOME).clear().type('Conta para alterar')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.containsMessage('Conta atualizada com sucesso!')
  })

  it('Should not create an account with the same name', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta mesmo nome')
    cy.containsMessage('code 400')
  })
  it('should create a transaction', () => {
    cy.get(loc.MENU.MOVIMENTACAO).click()
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
    cy.get(loc.MOVIMENTACAO.VALOR).type('500')
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
    cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    cy.containsMessage('sucesso')

    cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
    cy.get(loc.EXTRATO.FN_CSS_BUSCA_ELEMENTO('Desc', '500')).should('exist')
  })
  it('should get balance', () => {
    cy.get(loc.MENU.HOME).click()
    cy.get(loc.SALDO.FN_CSS_BUSCA_SALDO_CONTA('Conta para saldo', '534')).should('exist')
  })

  it('Should remove a transaction', () => {
    cy.get(loc.MENU.EXTRATO).click()
    cy.get(loc.EXTRATO.FN_CSS_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
    cy.containsMessage('removida')
  })
})
