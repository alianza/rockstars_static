describe('The Main page', () => {
    beforeEach(() => {
        cy.visit('/') // Uses baseUrl defined in cypress.json config file, run project locally with npm run `build-prod` & `serve`
    })

    it('shows title', () => { // Asserts that base url loads successfully
        cy.findAllByText('All Artists').should('have.length', 2)
    })

    it('successfully loads', () => { // Asserts that base url loads successfully
        console.log('Loaded base url');
    })
})
