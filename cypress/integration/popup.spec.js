/// <reference types="cypress"/>

describe('Work with Popup...', () => {
  beforeEach(() => {
    cy.visit('http://www.wcaquino.me/cypress/componentes.html')
  })

  // NOTE - Trabalhando com Popup diretamente
  it('Should test popup directly', () => {
    cy.visit('http://www.wcaquino.me/cypress/frame.html')
    cy.get('#otherButton').click()
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Click OK!')
    })
  })

  it('Should be popup invoked', () => {
    cy.window().then(win => {
      cy.stub(win, 'open').as('WindowOpen')
    })
    cy.get('#buttonPopUp').click()
    // NOTE - Procurando através do alias
    cy.get('@WindowOpen').should('be.called')
  })
  describe('Work with links...', () => {
    it('Check link', () => {
      cy.contains('Popup2').should('have.prop', 'href').and('equal', 'http://www.wcaquino.me/cypress/frame.html')
    })

    it('Should access link dynamically', () => {
    // NOTE - Acessar link dinamicamente
      cy.contains('Popup2').then($a => {
        const href = $a.prop('href')
        cy.visit(href)
        cy.get('#tfield').type('Funciona')
      })
    })

    it('Should force link on same page', () => {
      // NOTE - Forçar link na mesma pagina
      cy.contains('Popup2').invoke('removeAttr', 'target').click()
      cy.get('#tfield').type('Funciona')
    })
  })
})
