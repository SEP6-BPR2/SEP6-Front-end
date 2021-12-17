describe('Proper Movie Page Routing', () => {
    let text

    it('Routes to  Movie Page',()=>{
        cy.visit('https://sep6-front-end-an6w7okvaa-uc.a.run.app/#/')
        cy.get('.movie_item').first().trigger('mouseover',{force: true})
        cy.get('.movie_item').first().get('.title').first().invoke('text').should((text2)=>{
            text = text2
        })
        cy.get('.movie_item').first().get('.icon_movie').click({force: true})

    })

    it('checks proper Movie Page',()=>{
        cy.get('.movie-details').get('.title').first().should('have.text',text.trim())
    })
})
