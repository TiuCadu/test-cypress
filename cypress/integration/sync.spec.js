/// <reference types="cypress"/>
before(() => {
  cy.visit('http://www.wcaquino.me/cypress/componentes.html')
})

beforeEach(() => {
  cy.reload()
})

describe('Work with synchronism', () => {
  it('should wait for available element', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').type('Deu certo')
  })

  it('Should doing retry', () => {
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('exist')
  })

  it('Using find', () => {
    cy.get('#buttonList').click()
    cy.get('#lista li').find('span').should('contain', 'Item 1')
    cy.get('#lista li span').should('contain', 'Item 2')
  })
  it('Timeout use', () => {
    // cy.get('#buttonDelay').click()
    // cy.get('#novoCampo').should('exist')
    // cy.get('#novoCampo', { timeout: 1000 }).should('exist')
    cy.get('#buttonListDOM').click()
    cy.get('#lista li span').should('contain', 'Item 2')
  })

  it.only('Should vs Then', () => {
    cy.get('#buttonListDOM').click()
    cy.get('#lista li span').then($el => {
      expect($el).to.have.length(1)
    })
  })
})
