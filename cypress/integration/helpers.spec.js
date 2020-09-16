/// <reference types="cypress"/>
// before(() => {
//   cy.visit('http://www.wcaquino.me/cypress/componentes.html')
// })

// beforeEach(() => {
//   cy.reload()
// })

describe('Helpers...', () => {
  it('Wrap', () => {
    const obj = { nome: 'User', idade: '20' }
    expect(obj).to.have.property('nome')
    cy.wrap(obj).should('have.a.property', 'nome')

    cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    // cy.get('#formNome').then($el => {
    //   cy.wrap($el).type('Funciona na promisee pelo wrap')
    // })
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10)
      }, 500)
    })
    cy.get('#buttonSimple').then(() => console.log('Encontrei o botão ##001'))
    // promise.then(num => console.log(num))
    cy.wrap(promise).then(ret => console.log(ret))
    cy.get('#buttonCount').then(() => console.log('Encontrei o botão ##002'))
  })
  it.only('Its...', () => {
    const obj = { nome: 'User', idade: '20' }
    cy.wrap(obj).should('have.a.property', 'nome', 'User')
    cy.wrap(obj).its('nome').should('be.equal', 'User')

    const obj2 = { nome: 'User', idade: '20', endereco: { rua: 'fofurex' } }
    // cy.wrap(obj2).its('endereco').should('have.a.property', 'rua')
    // cy.wrap(obj2).its('endereco').its('rua').should('be.equal', 'fofurex')
    cy.wrap(obj2).its('endereco.rua').should('be.equal', 'fofurex')

    cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    cy.title().its('length').should('be.equal', 20)
  })
})
