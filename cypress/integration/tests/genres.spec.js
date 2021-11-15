describe('The Genres page', () => {
    beforeEach(() => {
        cy.visit('/') // Uses baseUrl defined in cypress.json config file, run project locally with npm run `build-prod` & `serve`
        cy.findByText('All Songs').click()
    })

    it('open genre', () => { // Asserts that base url loads successfully
        cy.get('a[href="/genre/Classic%20Rock"]').first().click()

        cy.location('pathname').should('include', '/genre/Classic%20Rock')

        cy.findByText('Genre: "Classic Rock"').should('exist')

        cy.findByText('320 Songs:').should('exist')

        cy.get('#genre').find('> div.relative.bg-secondary').should('have.length', 50)
    })
})
