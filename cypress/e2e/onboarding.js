describe('onboarding navigation', () => {
  it('can navigate to step 1', () => {
    cy.visit('/#/onboarding')
      .getByText(/Let's Get Started/)
      .click()
      .url()
      .should('include', 'onboarding/professional/step/1')
  })
})
