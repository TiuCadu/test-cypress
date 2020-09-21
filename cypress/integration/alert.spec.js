/// <reference types="cypress"/>

before(() => {
  cy.visit('http://www.wcaquino.me/cypress/componentes.html')
})

beforeEach(() => {
  cy.reload()
})
describe('Work with alerts', () => {
  it.only('Alert', () => {
    // cy.get('#alert').click()
    // cy.on('window:alert', msg => {
    // NOTE - Validar conteúdo do alert
    //   expect(msg).to.be.equal('Alert Simples')
    // })
    // NOTE - comando customizado
    cy.clickAlert('#alert', 'Alert Simples')
  })

  it('Alert', () => {
    // NOTE - Colocar Alias
    const stub = cy.stub().as('Alerta')
    cy.on('window:alert', stub)
    cy.get('#alert').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
    })
  })

  it('Confirm', () => {
    cy.get('#confirm').click()
    // NOTE - Validar conteúdo confirm
    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Confirm Simples')
    })
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Confirmado')
    })
  })

  it('Deny', () => {
    cy.get('#confirm').click()
    // NOTE - Negar alert
    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Confirm Simples')
      return false
    })
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Negado')
    })
  })

  it('Prompt', () => {
    cy.window().then(win => {
    // NOTE - Preencher Prompt
      cy.stub(win, 'prompt').returns('37')
    })
    cy.get('#prompt').click()
    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Era 37?')
    })
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal(':D')
    })
  })
})
