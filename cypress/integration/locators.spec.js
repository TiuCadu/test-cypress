/// <reference types="cypress"/>

before(() => {
  cy.visit('http://www.wcaquino.me/cypress/componentes.html')
})

beforeEach(() => {
  cy.reload()
})

describe('Work with locators...', () => {
  it('Using Jquery selector', () => {
    // NOTE Selector com *
    // Significa que ele irá procurar o onclick que possua o valor francisco
    cy.get('[onclick*="Francisco"]')
    // Busca por irmão seria com o "~" e depois entra no input
    cy.get('#tabelaUsuarios td:contains("Doutorado"):eq(0)~td:eq(3)>input')
    cy.get('#tabelaUsuarios tr:contains("Doutorado"):eq(0) td:eq(6)>input')
  })
  it.only('Using Xpath', () => {
    cy.xpath('//input')
  })
})
