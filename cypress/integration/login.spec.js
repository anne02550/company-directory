
  
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
    cy.get('#departmentID ').type('Human Resources')
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
    cy.get('#find-employee-button').should('be.hidden')
    cy.url().should('include', '/results')
  })

})
