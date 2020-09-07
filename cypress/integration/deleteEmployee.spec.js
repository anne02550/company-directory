describe('Test if users can delete employee', () => {

    beforeEach(() => {
      cy.visit('http://company-directory.tampham.co.uk/login')
      cy.get('#username')
        .type('hello')
      cy.get('#password')
        .type('hello')
      cy.get('.form-login-style')
        .submit()
      cy.url().should('include', '/results')
      
    }) 
}) 
  