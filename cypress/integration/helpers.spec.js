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
  it('Its...', () => {
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
  it.only('Invoke', () => {
    const getValue = () => 1
    const soma = (a, b) => a + b
    cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
    cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7)

    cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    cy.get('h3').invoke('html', '<h3>Teste Fudencia do nordeste</h3>')
    cy.get('#formNome').invoke('val', 'Texto via invoke')
    cy.window().invoke('alert', 'Fofura do nordeste')
    cy.get('#resultado').invoke('html', '<input type="button" value="Fofurex Hack" >') // NOTE - Alterar HTML da pagina
  })
})
