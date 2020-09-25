/// <reference types="cypress"/>

describe('Should test an API REST level', () => {
  before(() => {
    cy.getToken('carlos.oliveira@fofurex.com', '123456')
    // .then(tkn => {
    //   token = tkn
    // })
  })

  beforeEach(() => {
    cy.resetRest()
  })

  it('Should create an account', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
      headers: {
        // Authorization: `JWT ${token}`
      },
      body: {
        nome: 'Conta via rest'
      }
    }).as('response')

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Conta via rest')
    })
  })

  it.only('Should update an account', () => {
    cy.getContaByName('Conta para alterar')
      .then(contaId => {
        cy.request({
          method: 'PUT',
          url: `/contas/${contaId}`,

          body: { nome: 'Conta alterada via rest' }
        }).as('response')
        cy.get('@response').its('status').should('be.equal', 200)
      })
  })

  // })

  it('Should not create an account with the same name', () => {
    // NOTE - Parâmetro para erro 400
    cy.request({
      method: 'POST',
      url: '/contas',
      // headers: { Authorization: `JWT ${token}` },
      body: { nome: 'Conta mesmo nome' },
      failOnStatusCode: false
    }).as('response')
    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(400)
      expect(res.body.error).to.be.contains('Já existe uma conta')
      console.log(res)
    })
  })
  it('should create a transaction', () => {
    // NOTE - Alterar data e hora nas requisições moments
    cy.getContaByName('Conta para movimentacoes')
      .then(contaId => {
        cy.request({
          method: 'POST',
          url: '/transacoes',
          // headers: { Authorization: `JWT ${token}` },
          body: {
            tipo: 'REC',
            data_transacao: Cypress.moment().format('DD/MM/YYYY'),
            data_pagamento: Cypress.moment().add({ days: 1 }).format('DD/MM/YYYY'),
            descricao: 'desc',
            valor: '123',
            envolvido: 'inter',
            conta_id: contaId,
            status: true
          }
        }).as('response')
      })
    cy.get('@response').its('status').should('be.equal', 201)
    cy.get('@response').its('body.id').should('exist')
  })
  it('should get balance', () => {
    cy.request({
      method: 'GET',
      url: '/saldo'
      // headers: { Authorization: `JWT ${token}` }
    }).then(res => {
      let saldoConta = null
      res.body.forEach(c => {
        if (c.conta === 'Conta para saldo') saldoConta = c.saldo
      })
      expect(saldoConta).to.be.equal('534.00')
    })

    cy.getTransacoes('Movimentacao 1, calculo saldo')
      .then(res => {
        cy.request({
          method: 'PUT',
          url: `/transacoes/${res.body[0].id}`,
          // headers: { Authorization: `JWT ${token}` },
          body: {
            data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
            data_pagamento: Cypress.moment(res.body[0].data_transacao).add({ days: 1 }).format('DD/MM/YYYY'),
            descricao: res.body[0].descricao,
            envolvido: res.body[0].envolvido,
            valor: res.body[0].valor,
            conta_id: res.body[0].conta_id,
            status: true
          }
        }).its('status').should('be.equal', 200)
      })
    cy.request({
      method: 'GET',
      url: '/saldo'
      // headers: { Authorization: `JWT ${token}` }
    }).then(res => {
      let saldoConta = null
      res.body.forEach(c => {
        if (c.conta === 'Conta para saldo') saldoConta = c.saldo
      })
      expect(saldoConta).to.be.equal('4034.00')
    })
  })

  it('Should remove a transaction', () => {
    cy.getTransacoes('Movimentacao para exclusao')
      .then(res => {
        cy.request({
          method: 'DELETE',
          url: `/transacoes/${res.body[0].id}`
          // headers: { Authorization: `JWT ${token}` }
        }).its('status').should('be.equal', 204)
      }

      )
  })
})
