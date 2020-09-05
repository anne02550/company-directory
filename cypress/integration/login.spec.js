
  
  describe('Unauthorised users cannot access the site', () => {

    it('Should redirrect to the /login page', () => {
      cy.visit('http://company-directory.tampham.co.uk/results')
      cy.url().should('include', '/login')
    })

    it('Should not allow access to the result page if you dont have username', () => {
      cy.visit('http://company-directory.tampham.co.uk/login')
      cy.get('#username')
        .type('foo')
      cy.get('#password')
        .type('bar')
      cy.get('.form-login-style')
        .submit()
      cy.url().should('include', '/login')
      cy.contains('The username or password was incorrect. Please try again.')
    })

    it('Should not allow access to the result page if you type the wrong password', () => {
      cy.visit('http://company-directory.tampham.co.uk/login')
      cy.get('#username')
        .type('hello')
      cy.get('#password')
        .type('foo')
      cy.get('.form-login-style')
        .submit()
      cy.url().should('include', '/login')
      cy.contains('The username or password was incorrect. Please try again.')
    })
  })

describe('Test User Can Login/ Logout', () => {
  it('Should allow me to login', () => {
    cy.visit('http://company-directory.tampham.co.uk/login')
    cy.get('#username')
      .type('hello')
    cy.get('#password')
      .type('hello')
    cy.get('.form-login-style')
      .submit()
    cy.url().should('include', '/results')
  })

  it('Should allow me to logout', () => {
    cy.visit('http://company-directory.tampham.co.uk/login')
    cy.get('#username')
      .type('hello')
    cy.get('#password')
      .type('hello')
    cy.get('.form-login-style')
      .submit()
    cy.url().should('include', '/results')
    cy.get('#logOutButton')
      .click()
    cy.get('#logOutConfirmation')
      .should('be.visible')
      .wait(500)
    cy.get('#logOutConfirmation .logout')
      .click()
    cy.url().should('include', '/login')
    
  })

})