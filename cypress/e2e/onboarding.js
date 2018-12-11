describe('yay', () => {
  it('can yay', () => {
    cy.visit('/#/onboarding')
      .getByText(/Let's Get Started/)
      .click()
  })
})
