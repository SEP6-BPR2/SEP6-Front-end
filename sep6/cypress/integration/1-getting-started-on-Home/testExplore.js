describe('testExploreRouting',()=>{

    let text =[]

    it('shouldGoToExplorePage',()=>{
        cy.visit('https://sep6-front-end-an6w7okvaa-uc.a.run.app/#/')
        cy.get('#explore_button').click()
    })

    it('sort list By drama genre',()=>{
        cy.get('[data-cy=genre_select]').parent().click({force: true})
        cy.get(".v-list-item__title").contains("Drama").click()
    })

    it('sort list By title',()=>{
        cy.get('[data-cy=sortBy_select]').parent().click({force: true})
        cy.get(".v-list-item__title").contains("title").click()
    })

    it('sort list By Ascending order',()=>{
        cy.get('[data-cy=order_select]').parent().click({force: true})
        cy.get(".v-list-item__title").contains("ASC").click()
        cy.get('.movie_item').first().get('.title').each((el)=>{
            let title = el[0].innerHTML.trim()
            // || /\d/.test(title) lets forget about numbers cause they are not properly sorted in project
            if(/^[A-Z]/.test(title)|| /\d/.test(title) ){
                    text.push(el[0].innerHTML.trim().toLowerCase())
                }
        })
    })

    it('check that the sorting works',()=>{
        assert.isTrue(!!text.reduce((n, item) => n !== false && item >= n && item), 'this val is true')
    })


})