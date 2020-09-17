/// <reference types="cypress"/>

before(() => {
  cy.visit('http://www.wcaquino.me/cypress/componentes.html')
})

beforeEach(() => {
  cy.reload()
})
describe('Work with alerts', () => {
  it('Alert', () => {
    cy.get('#alert').click()
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Alert Simples') // NOTE Validar conteúdo do alert
      console.log(msg)
    })
  })

  it.only('Alert', () => {
    const stub = cy.stub().as('Alerta') // NOTE Colocar Alias
    cy.on('window:alert', stub)
    cy.get('#alert').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
    })
  })
})
