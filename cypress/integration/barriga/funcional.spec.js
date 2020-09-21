/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test a funcional level', () => {
  before(() => {
    cy.login('carlos.oliveira@fofurex.com', '123456')
    cy.resetApp()
  })

  it('Should create an account', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta Teste')
    cy.containsMessage('Conta inserida com sucesso!')
    // cy.get(loc.MESSAGE).should('exist').and('contain.text', 'Conta inserida com sucesso!')
  })

  it('Should update an account', () => {
    cy.acessarMenuConta()
    cy.get('td:contains("Conta Teste")~td i:eq(0)').click()
    cy.get(loc.CONTAS.NOME).clear().type('Conta Teste')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.containsMessage('Conta atualizada com sucesso!')
    // cy.get(loc.MESSAGE).should('exist').and('contain.text', 'Conta atualizada com sucesso!')
  })

  it('Should not create an account with the same name', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta Teste')
    cy.containsMessage('code 400')
  })
})
