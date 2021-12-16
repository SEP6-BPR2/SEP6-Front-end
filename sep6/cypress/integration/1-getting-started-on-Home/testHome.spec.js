describe('testHomePage', () => {

    beforeEach(() => {
        cy.visit('https://localhost:8080/#/')
    })

    it('shows Carousel',()=>{
        cy.get('.VueCarousel-slide').children('#imgcontainer')
    })

    it('has more than ten movies displayed',()=>{
        cy.get('.movie_view').children('.movie_item').should('have.length.at.least',10)
    })
})