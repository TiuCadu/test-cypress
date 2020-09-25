// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
  cy.get(locator).click()
  cy.on('window:alert', msg => {
    expect(msg).to.be.equal(message)
  })
})

Cypress.Commands.add('login', (user, passwd) => {
  cy.visit('http://barrigareact.wcaquino.me/')
  cy.get(loc.LOGIN.USER).type(user)
  cy.get(loc.LOGIN.PASSWORD).type(passwd)
  cy.get(loc.LOGIN.BTN_LOGIN).click()
  cy.get(loc.MESSAGE).should('exist').and('contain.text', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () => {
  cy.get(loc.MENU.SETTINGS).click()
  cy.get(loc.MENU.RESET).click()
})

Cypress.Commands.add('containsMessage', msg => {
  cy.get(loc.MESSAGE).should('exist').and('contain.text', msg)
})

Cypress.Commands.add('getToken', (user, passwd) => {
  cy.request({
    method: 'POST',
    url: '/signin',
    body: {
      email: user,
      senha: passwd,
      redirecionar: false
    }
  }).its('body.token').should('not.be.empty')
    .then(token => {
      Cypress.env('token', token)
      return token
    })
})

Cypress.Commands.add('resetRest', (token) => {
  cy.request({
    method: 'GET',
    url: '/reset'
    // headers: { Authorization: `JWT ${token}` }
  }).its('status').should('be.equal', 200).as('reset')
})

Cypress.Commands.add('getContaByName', (name, token) => {
  cy.request({
    method: 'GET',
    url: '/contas',
    // headers: { Authorization: `JWT ${token}` },
    qs: { nome: name }
  }).then(res => {
    return res.body[0].id
  })
})

Cypress.Commands.add('getTransacoes', (desc, token) => {
  cy.request({
    method: 'GET',
    url: '/transacoes',
    qs: { descricao: desc }
    // headers: { Authorization: `JWT ${token}` }
  })
})

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
  if (options.length === 1) {
    if (Cypress.env('token')) {
      options[0].headers = {
        Authorization: `JWT ${Cypress.env('token')}`
      }
    }
  }
  return originalFn(...options)
})
