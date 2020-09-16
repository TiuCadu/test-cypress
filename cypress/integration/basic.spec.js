/// <reference types="cypress"/>
describe('Cypress basic', () => {
  it.only('Should visit a page and assert title', () => {
    cy.visit('http://www.wcaquino.me/cypress/componentes.html')

    cy.title()
      .should('be.equal', 'Campo de Treinamento')
      .and('contain', 'Treinamento')
    cy.title().then((title) => {
      console.log('Teste Fofura', title)
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
