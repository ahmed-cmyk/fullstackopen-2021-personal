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

            cy.get('.error')
              .should('contain', 'wrong username or password')
              .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'root', password: 'password' })
        })

        it('A blog can be created', function() {
            cy.createBlog({
                title: 'Cypress test blog',
                author: 'Cypress',
                url: 'www.example.com',
                likes: 10
            })

            cy.contains('Cypress test blog')
        })

        describe('Blog exists', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'Cypress test blog',
                    author: 'Cypress',
                    url: 'www.example.com',
                    likes: 10
                })
            })

            it('You can like a blog', function() {
                cy.contains('view').click()

                cy.get('.blogLikes_number').as('likes')
                cy.get('.blogLikes_button').click()

                cy.get('@likes').should('contain', 11)
            })

            it('User can delete blogs they create', function() {
                cy.contains('view').click()
                cy.get('#delete_button').click()
            })
        })

        describe('Another user creates a blog', function() {
            beforeEach(function() {
                cy.request('POST', 'http://localhost:3003/api/users', { username: 'root2', password: 'password' })
                cy.login({ username: 'root2', password: 'password' })
                cy.createBlog({
                    title: 'Cypress alt test blog',
                    author: 'Cypress',
                    url: 'www.example.com',
                    likes: 5
                })
            })

            it.only('User cannot delete blog they didn\'t create', function() {
                cy.login({ username: 'root', password: 'password' })
                cy.contains('view').click()

                cy.contains('Cypress alt test blog')
                  .parent()
                  .get('#delete_button')
                  .should('not.be.visible')
            })
        })
        
    })
})