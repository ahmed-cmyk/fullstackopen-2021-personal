describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', { username: 'root', password: 'password' })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log into application')
        cy.get('#username').should('be.visible')
        cy.get('#password').should('be.visible')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('root')
            cy.get('#password').type('password')
            cy.get('#login-button').click()

            cy.contains('root logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('root')
            cy.get('#password').type('notpassword')
            cy.get('#login-button').click()

            cy.contains('wrong username or password')
        })
    })
})