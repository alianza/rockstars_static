describe('The Songs page', () => {
    beforeEach(() => {
        cy.visit('/') // Uses baseUrl defined in cypress.json config file, run project locally with npm run `build-prod` & `serve`
        cy.findByText('All Songs').click()
    })

    it('shows initial songs', () => { // Asserts that base url loads successfully
        cy.findAllByText('All Songs').should('have.length', 2)

        cy.get('#songs').find('> div.relative.bg-secondary').should('have.length', 50)
    })

    it('filter songs', () => { // Asserts that base url loads successfully
        cy.findByPlaceholderText('Search songs! 🎵').click().type('Reaper')

        cy.get('#songs').find('> div.relative.bg-secondary').should('have.length', 1)
    })
})
