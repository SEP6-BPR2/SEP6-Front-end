describe('testSearching', () => {
    it('Routes to  Search Page',()=>{
        cy.visit('https://sep6-front-end-an6w7okvaa-uc.a.run.app/#/')
       cy.get('#input-12').type('mama')
        cy.get('#search_button').click()
    })

    it('results contain inputed field mama',()=>{
        cy.get('.movie_item').get('div').eq(1).contains('mama')
    })

    it('Re-routes to  Search Page',()=>{
        cy.visit('https://sep6-front-end-an6w7okvaa-uc.a.run.app/#/')
        cy.get('#input-12').type('Spider')
        cy.get('#search_button').click()
    })

    it('results contain inputed field spider',()=>{
        cy.get('.movie_item').get('div').eq(1).contains('Spider')
    })
})