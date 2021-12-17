/* eslint-disable */
describe('testHomePage', () => {

    beforeEach(() => {
        cy.visit('https://sep6-front-end-an6w7okvaa-uc.a.run.app/#/')
    })

    it('shows Carousel',()=>{
        cy.get('.VueCarousel-slide').children('#imgcontainer')
    })

    it('has more than ten movies displayed',()=>{
        cy.get('.movie_view').children('.movie_item').should('have.length.at.least',10)
    })
})