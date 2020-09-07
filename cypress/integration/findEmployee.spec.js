describe('Test if users can find employee', () => {

    beforeEach(() => {
      cy.visit('http://company-directory.tampham.co.uk/login')
      cy.get('#username')
        .type('hello')
      cy.get('#password')
        .type('hello')
      cy.get('.form-login-style')
        .submit()
      cy.url().should('include', '/results')
      cy.get('#find-employee-button')
        .click()
      cy.get('#find-employee-form')
        .should('be.visible')
    }) 
  
    it('Should allow me to search by department', () => {
      cy.get('#find-employee-form #departmentID ').select('Human Resources')
      cy.get('#findEmployeeButton').click()
      cy.url().should('include', '/results')
      cy.get('.card')
      cy.should('contain', 'Human Resources')
    })
  
    it('Should allow me to search by job title', () => {
      cy.get('#find-jobTitle').type('COO')
      cy.get('#findEmployeeButton').click()
      cy.url().should('include', '/results')
      cy.get('.card')
      cy.should('contain', 'Taylor St. Quintin')
    })
  
    it('Should allow me to search by first name', () => {
      cy.get('#firstName').type('VERN')
      cy.get('#findEmployeeButton').click()
      cy.url().should('include', '/results')
      cy.get('.card')
      cy.should('contain', 'Vern Durling')
    })
   
    it('Should allow me to search by last name', () => {
      cy.get('#lastName').type('Edgson')
      cy.get('#findEmployeeButton').click()
      cy.url().should('include', '/results')
      cy.get('.card')
      cy.should('contain', 'Aveline Edgson')
    })
  
    it('Should allow me to search by last name, Case insensitive', () => {
      cy.get('#lastName').type('edgson')
      cy.get('#findEmployeeButton').click()
      cy.url().should('include', '/results')
      cy.get('.card')
      cy.should('contain', 'Aveline Edgson')
    })
  
    it('Should allow me to search by email', () => {
      cy.get('#email').type('rheffron0@ibm.com')
      cy.get('#findEmployeeButton').click()
      cy.url().should('include', '/results')
      cy.get('.card')
      cy.should('contain', 'Rosana Heffron')
    })
  
    it('Should allow me to search by email, Case insensitive', () => {
      cy.get('#email').type('rHeFfRoN0@IBM.com')
      cy.get('#findEmployeeButton').click()
      cy.url().should('include', '/results')
      cy.get('.card')
      cy.should('contain', 'Rosana Heffron')
    })
  
    it('Should allow me to close the search form ', () => {
      cy.get('#closeButton').click()
      cy.url().should('include', '/results')
    })
  
    // not sure:
    it('Should allow me to clear a search', () => {
      cy.get('#email').type('rHeFfRoN0@IBM.com')
      cy.get('#findEmployeeButton').click()
      cy.url().should('include', '/results')
      cy.get('.card')
      cy.should('contain', 'Rosana Heffron')
      cy.get('#clear-search').click()
      cy.url().should('include', '/results')
    })
  
  })