describe('login', () => {
  beforeEach(function() {
    // alias the users fixtures
    cy.fixture('users.json').as('users')
  })

  it('login test mobile', () => {
    cy.get('@users').then(users => {
      const user = users

      cy.visit('/#/login')
        .getByText(/Dental Professional/)
        .click()
        .getByText('Email')
        .siblings('input')
        .type(user.email)
        .should('have.value', user.email)
        .getByText('Password')
        .siblings('input')
        .type(user.password)
        .should('have.value', user.password)
    })
  })

  it('login test desktop', () => {
    cy.get('@users').then(users => {
      const user = users

      cy.viewport('macbook-15')
        .visit('/#/login')
        .getByText(/Dental Professional/)
        .click()
        .getByText('Email')
        .siblings('input')
        .type(user.email)
        .should('have.value', user.email)
        .getByText('Password')
        .siblings('input')
        .type(user.password)
        .should('have.value', user.password)
    })
  })
})
