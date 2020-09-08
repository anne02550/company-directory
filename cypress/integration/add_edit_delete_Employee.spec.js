describe('Test if users can add-edit-delete employee', () => {
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

      it('Should allow me to edit employee', () => {
        cy.get('#addEmployeeClose').click()
        cy.url().should('include', '/results') 

        const card = cy.get('.card')
        .filter(':contains("Anne Asprey")')
        .filter(':contains("anne@yahoo.com")')

        card.find('#cardFooter #edit').click()
        cy.get('#update-employee-modal').should('be.visible')
        cy.get('#update-employee-modal #edit-email').clear().type('calm@yahoo.com')
        cy.get('#update-employee-modal #saveButton').click()
        cy.url().should('include', '/results')

        const updatedCard = cy.get('.card')
        .filter(':contains("Anne Asprey")')

        updatedCard.should('contain', 'Anne Asprey')
        updatedCard.should('contain', 'calm@yahoo.co') 
      })

      it('Should allow me to close edit form', () => {
        cy.get('#addEmployeeClose').click()
        cy.url().should('include', '/results')

        const card = cy.get('.card')
        .filter(':contains("Anne Asprey")')
        .filter(':contains("calm@yahoo.co")')

        card.find('#cardFooter #edit').click()
        cy.get('#update-employee-modal').should('be.visible')
        cy.get('#modal-footer #cancelButton').click()
        cy.url().should('include', '/results')

      })

      it('Should allow me to delete employee', () => {
        cy.get('#addEmployeeClose').click()
        cy.url().should('include', '/results') 

        const card = cy.get('.card')
        .filter(':contains("Anne Asprey")')
        .filter(':contains("anne@yahoo.com")')

        card.find('#cardFooter #delete').click()
        cy.get('#confirm-delete').should('be.visible')
        cy.get('#confirm-delete #deleteFormButton').click()
        cy.url().should('include', '/results')
      })

      it('Should allow me to cancel delete employee form', () => {
        cy.get('#addEmployeeClose').click()
        cy.url().should('include', '/results') 

        const card = cy.get('.card')
        .filter(':contains("Anne Asprey")')
        .filter(':contains("anne@yahoo.com")')

        card.find('#cardFooter #delete').click()
        cy.get('#confirm-delete').should('be.visible')
        cy.get('#confirm-delete #cancelDeleteForm').click()
        cy.url().should('include', '/results')
      })

  })
 