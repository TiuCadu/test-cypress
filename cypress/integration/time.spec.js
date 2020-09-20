/// <reference types="cypress"/>

beforeEach(() => {
  cy.visit('http://www.wcaquino.me/cypress/componentes.html')
})

describe('Clock and Tick', () => {
  // NOTE - Modificar horário do sistema
  describe('Should find and interact with element', () => {
    it('Back to the past', () => {
      cy.get('#buttonNow').click()
      cy.get('#resultado > span').should('contain', '20/09/2020')

      //   cy.clock()
      //   cy.get('#buttonNow').click()
      //   cy.get('#resultado > span').should('contain', '31/12/1969')

      const dt = new Date(2012, 3, 10, 15, 23, 50)
      cy.clock(dt.getTime())
      cy.get('#buttonNow').click()
      cy.get('#resultado > span').should('contain', '31/12/1969')
    })
    it.only('Goes to the future', () => {
      cy.get('#buttonTimePassed').click()
      cy.get('#resultado > span').should('contain', 16006)
      cy.get('#resultado > span').invoke('text').should('be.gt', 16)
    })
  })
})
