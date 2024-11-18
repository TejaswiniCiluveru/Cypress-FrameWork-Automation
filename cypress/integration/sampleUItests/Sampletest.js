describe('W3Schools Test Suite', () => {
    // Run once before all tests


    // Test 1: Verify page title and main sections
    it('should verify the page title and main sections', () => { // Verify title
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        cy.get('.products').should('have.length', 1)

        cy.get('.product:visible').should('have.length', 4)
        cy.get('.product-name').first().should('contain', 'Cauliflower');
        cy.get('.product-action button').eq(2).contains('ADD TO CART').click();
        cy.get('.product-action button').eq(2).should('contain', 'ADDED');
        cy.wait(2000)
        cy.get('.product-action button').eq(2).should('contain', 'ADD TO CART');
        cy.get('.products').find('.product').each(($el, index, $list) => {
            const textveg = $el.find('h4.product-name').text()
            if (textveg.includes('Cashews')) {
                cy.wrap($el).find('button').click()
            }
        })
        // cy.get('.cart').find('cart-icon').find('.cart-count').contains('2')
        cy.get('.cart-icon > img').click()
        cy.get('.cart').find('.cart-preview.active').find('.action-block').find('button').click()
        cy.get('[style="text-align: right; width: 100%; margin-top: 20px; margin-right: 10px;"] > :nth-child(14)').click()
        cy.get('select').select('India')
        cy.get('select').should('have.value', 'India')
        cy.get('input[type="checkbox"]').click();

        // Verify the checkbox is checked
        cy.get('input[type="checkbox"]').should('be.checked');
        cy.get('button').should('contain', 'Proceed')
        cy.get('button').click()
        cy.get('[style="color:green;font-size:25px"]').should('contain', 'Home')

        // cy.get('.products').find('.product:visible').eq(2).contains('ADD TO CART').click()
        // cy.get(':nth-child(3) > .product-action > button').click()

    });

});
