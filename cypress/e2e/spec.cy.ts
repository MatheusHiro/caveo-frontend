describe('ProductCard', () => {
  it('Correct display', () => {
    cy.visit('http://localhost:3000/')

    cy.get('div[id*="ProductCard"]').should('exist')

  })
  it('Add cart action', () => {
    cy.visit('http://localhost:3000/')

    cy.get('button[id="HoveredButton"]')
      .first()
      .trigger('mouseover')

    cy.get('button[id="AddCartButton"]')
      .should('be.visible')
      .click()
  })
  it('Navigation', () => {
    cy.visit('http://localhost:3000/')

    cy.get('a[href^="/products/"]').first().click()

    cy.url().should('include', '/products/')
  })
})