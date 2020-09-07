describe('Test if users can add employee', () => {
    beforeEach(() => {
      cy.visit('http://company-directory.tampham.co.uk/login')
      cy.get('#username')
        .type('hello')
      cy.get('#password')
        .type('hello')
      cy.get('.form-login-style')
        .submit()
      cy.url().should('include', '/results')
      cy.get('#add-employee-button')
        .click()
      cy.get('#add-employee-form')
        .should('be.visible')
    }) 
  
    it('Should allow me to add employee', () => {
      cy.get('#add-employee-form #departmentID').select('Human Resources')
      cy.get('#add-employee-form #jobTitle').type('COO')
      cy.get('#add-employee-form #firstName').type('Anne')
      cy.get('#add-employee-form #lastName').type('Asprey')
      cy.get('#add-employee-form #email').type('anne@yahoo.com')
      cy.get('#add-employee-form #add-button').click().wait(500)
      cy.url().should('include', '/results')
      cy.get('.card')
      cy.should('contain', 'Anne Asprey', 'anne@yahoo.com')
    })
   
    it('Should allow me to close Add employee form', () => {
      cy.get('#add-employee-form #departmentID').select('Human Resources')
      cy.get('#add-employee-form #jobTitle').type('COO')
      cy.get('#addEmployeeClose').click()
      cy.url().should('include', '/results')
    })

    it('Should allow me to find the new added employee', () => {
        cy.get('#addEmployeeClose').click()
        cy.url().should('include', '/results')
        cy.get('#find-employee-button')
          .click()
        cy.get('#find-employee-form')
          .should('be.visible')
        cy.get('#find-employee-form #firstName').type('Anne')
        cy.get('#find-employee-form #lastName').type('Asprey')
        cy.get('#find-employee-form #email').type('anne@yahoo.com')
        cy.get('#find-employee-form #findEmployeeButton').click()
        cy.url().should('include', '/results')
        cy.get('.card')
        cy.should('contain', 'Anne Asprey', 'anne@yahoo.com')
      })


  })
  
