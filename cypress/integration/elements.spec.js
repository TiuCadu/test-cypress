/// <reference types="cypress"/>
before(() => {
  cy.visit('http://www.wcaquino.me/cypress/componentes.html')
})
beforeEach(() => {
  cy.reload()
})

describe('Work with basic elements', () => {
  describe('Should find and interact with element', () => {
    it('Text should contain "Cuidado"', () => {
      cy.get('.facilAchar')
        .should('contain', 'Cuidado')
        .and('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })
  })

  describe('Should click on button', () => {
    it('links', () => {
      cy.get('[href="#"]')
        .click()
      cy.contains('Voltou!')
      cy.reload()
      cy.contains('Status: Nao cadastrado')
    })
  })

  describe('TextFields and Buttons', () => {
    it('Type "Carlos Oliveira" on inputText name', () => {
      cy.get('#formNome')
        .type('Carlos Oliveira')
        .should('have.value', 'Carlos Oliveira')
    })

    it('Type and erase on inputText "Sobrenome"', () => {
      cy.get('[data-cy=dataSobrenome]')
        .type('TeuCu{backspace}{backspace}')
    })

    it('Type anything else on textArea', () => {
      cy.get('#elementosForm\\:sugestoes')
        .type('Alguma coisa sem graça')
        .should('contain.value', 'Alguma coisa sem graça')
        .clear()
        .type('Erro{selectall}Foda-se', { delay: 100 })
        .should('have.value', 'Foda-se')
    })
  })

  describe('Radio buttons', () => {
    it('Click radio button "Feminino"', () => {
      cy.get('#formSexoFem')
        .click()
        .should('be.checked')
      cy.get('#formSexoMasc')
        .should('not.be.checked')
    })
    it('Number of radio buttons should be two', () => {
      cy.get("[name='formSexo']")
        .should('have.length', 2)
    })
  })

  describe('Work with checkboxes', () => {
    it('Click pizza checkbox', () => {
      cy.get('#formComidaPizza')
        .click()
        .should('be.checked')
    })
    it('Click all checkboxes', () => {
      cy.get('[name=formComidaFavorita]')
        .click({ multiple: true })
    })
    it('Should all checkboxes checked', () => {
      cy.get('[name=formComidaFavorita]')
        .click({ multiple: true })
        .should('be.checked')
        .and('have.length', 4)
    })
  })
  describe('Work with combo box', () => {
    it('Single select', () => {
      cy.get('#formEscolaridade')
        .select('2o grau completo')
        .should('have.value', '2graucomp')
    })
    it('Multiple combo boxes', () => {
      cy.get('[data-testid=dataEsportes]')
        .select(['Corrida', 'natacao'])
        // TODO validar opções do combo múltiplo
    })
  })
})
