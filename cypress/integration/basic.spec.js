/// <reference types="cypress"/>
describe('Cypress basic', () => {
  it.only('Should visit a page and assert title', () => {
    cy.visit('http://www.wcaquino.me/cypress/componentes.html')

    cy.title()
      .should('be.equal', 'Campo de Treinamento')
      .and('contain', 'Treinamento')

    let syncTitle
    cy.title().then((title) => {
      console.log('Teste Fofura ====>', title)
      cy.get('#formNome').type(title)
      syncTitle = title
    })

    cy.get('[data-cy=dataSobrenome]').then($el => {
      cy.wrap($el).type(syncTitle)
    })
  })

  it('Should find and interact with an element', () => {
    cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    cy.get('#buttonSimple')
      .pause()
      .click()
      .and('have.value', 'Obrigado!')
    cy.get('#buttonSimple')
      .click()
      .and('contain.value', 'Obrigado')
  })
})
