/// <reference types="cypress"/>

beforeEach(() => {
  cy.visit('http://www.wcaquino.me/cypress/componentes.html')
})
// NOTE - Teste dinâmico
const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
describe('Dinamic tests', () => {
  foods.forEach(food => {
    it(`Should register dinamic food - ${food}`, () => {
      cy.get('#formNome').type('Nome')
      cy.get('#formSobrenome').type('SobreNome')
      cy.get('[name="formSexo"][value="M"]').click()
      cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()
      cy.get('#formEscolaridade').select('Doutorado')
      cy.get('#formEsportes').select('Corrida')
      cy.get('#formCadastrar').click()
      cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
    })
  })
  it.only('should select all using each', () => {
    // NOTE - Não selecionar todos
    cy.get('#formNome').type('Nome')
    cy.get('#formSobrenome').type('SobreNome')
    cy.get('[name="formSexo"][value="M"]').click()
    cy.get('[name="formComidaFavorita"]').each($el => {
      if ($el.val() !== 'vegetariano') {
        cy.wrap($el).click()
      }
    })
    cy.get('#formEscolaridade').select('Doutorado')
    cy.get('#formEsportes').select('Corrida')
    cy.get('#formCadastrar').click()
    cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
  })
})
