describe('My First Integration Test Suite', function () {

    it('should verify the page title and main sections', function () {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        }, {
            statusCode: 200,
            body: [
                {
                    "book_name": "RestAssured with Java",
                    "isbn": "RSU",
                    "aisle": "2301"
                }
            ]

        }).as('retrieval');
        cy.get('.btn-primary', {timeout: 10000}).click();
        cy.wait('@retrieval')
    })
})
