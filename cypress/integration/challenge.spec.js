/// <reference types="cypress"/>
const cssButtonCadastrar = '#formCadastrar'
const cssInputNome = '#formNome'
const cssInputSobreNome = '[data-cy=dataSobrenome]'
const cssRadioMasculino = '#formSexoMasc'
const cssRadioFeminino = '#formSexoFem'
const cssFormRadioSexo = "[name='formSexo']"
const cssTextNome = '#descNome span'
const cssTextSobreNome = '#descSobrenome span'
const cssTextSexo = '#descSexo span'

before(() => {
  cy.visit('http://www.wcaquino.me/cypress/componentes.html')
})

describe('Challenge #001', () => {
  describe('Test #001 Register user', () => {
    it('Should click in button "Cadastrar" and type in field "Nome"', () => {
      const stub = cy.stub().as('Alert')
      cy.on('window:alert', stub)
      cy.get(cssButtonCadastrar).click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))
      cy.get(cssInputNome).type('Cadu').as('Field Name')
    })

    it('Should click in button "Cadastrar" and type in field "Sobrenome"', () => {
      const stub = cy.stub().as('Alert')
      cy.on('window:alert', stub)
      cy.get(cssButtonCadastrar).click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Sobrenome eh obrigatorio'))
      cy.get(cssInputSobreNome).type('Oliveira').as('LastName')
    })

    it('Should click in "Cadastrar" and click in radio button', () => {
      const stub = cy.stub().as('Alert')
      cy.on('window:alert', stub)
      cy.get(cssButtonCadastrar).click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Sexo eh obrigatorio'))
      cy.get(cssRadioMasculino).click().should('be.checked')
      cy.get(cssRadioFeminino).should('not.be.checked')
      cy.get(cssFormRadioSexo).should('have.length', 2)
      cy.get(cssButtonCadastrar).click()
    })

    it('Should be registered with success', () => {
      cy.get(cssTextNome).should('have.text', 'Cadu')
      cy.get(cssTextSobreNome).should('have.text', 'Oliveira')
      cy.get(cssTextSexo).should('have.text', 'Masculino')
    })
  })
})
