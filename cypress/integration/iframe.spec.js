/// <reference types="cypress"/>

describe('Iframes...', () => {
  // NOTE - Trabalhando com Iframe
  it('Should input text on iframe', () => {
    cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    cy.get('#frame1').then(iframe => {
      const body = iframe.contents().find('body')
      cy.wrap(body).find('#tfield').type('Iframe').should('have.value', 'Iframe')
    })
  })

  it('Should test iframe directly', () => {
    // NOTE - Iframe diretamente na pagina
    cy.visit('http://www.wcaquino.me/cypress/frame.html')
    cy.get('#otherButton').click()
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Click OK!')
    })
  })
})
