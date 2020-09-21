/// <reference types="cypress"/>
// NOTE - Como fazer exportação
import { soma } from './exportar'
// const exportar = require('./exportar')
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
    console.log(soma(2, 1))
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
    // NOTE - Colocar timeout
    // cy.get('#novoCampo', { timeout: 1000 }).should('exist')
    cy.get('#buttonListDOM').click()
    cy.get('#lista li span').should('contain', 'Item 2')
  })

  it('Should vs Then', () => {
    cy.get('#buttonListDOM').click()
    cy.get('#lista li span').then($el => {
      expect($el).to.have.length(1)
    })
  })
})
