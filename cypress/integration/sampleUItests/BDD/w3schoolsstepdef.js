import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

Given('', () => {
    w3login = new w3Login();
    w3login.goTo(url);
});
When('i login into the url without giving password', () => {
    cy.get('a.user-anonymous.tnb-login-btn.w3-btn', {timeout: 10000}).click();
    cy.get('input[name="email"]').type(this.data.credentials.email);
    cy.get('button[type="submit"]').click();
    w3login.loginWithoutPassword(this.data.credentials.email);
    cy.get('.LoginForm_error_text__4fzmN', {timeout: 10000}).should('contain', this.data.messageNotification);
});
When('i login into the url with different password', () => {
    cy.get('input[name="email"]').clear();
    w3login.login(this.data.credentials.email, this.data.credentials.password);
    cy.get('.LoginForm_error_text__4fzmN', {timeout: 10000}).should('contain', "Make sure you type your email and password correctly. Both your password and email are case-sensitive.");
});
When('i login into the url with actual passwordpassword', function (datatatable) {
    cy.get('input[name="email"]').clear();
    cy.get('input[name="password"]').clear();
    w3login.login(datatable.rawTable[1][0], datatable.rawTable[1][1]);
    cy.get('.LoginForm_error_text__4fzmN', {timeout: 10000}).should('contain', "Make sure you type your email and password correctly. Both your password and email are case-sensitive.");
});
Then('javascript content', () => {
    cy.get('input[placeholder="Search..."]', {timeout: 10000}).type('javascript').click();
    cy.get('#tnb-search-suggestions', {timeout: 10000}).should('be.visible').find('.search-suggestion-link').contains(this.data.constantText.javaScriptTutorial).click();

    Cypress.config('defaultCommandTimeout', 12000);
    cy.url().should('eq', Cypress.env('url') + "/js/default.asp");

    cy.get('#leftmenuinnerinner > :nth-child(1)', {timeout: 10000}).should('contain', 'JS Tutorial');

    const links = document.querySelectorAll('#leftmenuinnerinner a');
    links.forEach(link => {
        console.log(link.textContent.trim());
    });

    cy.get('#leftmenuinnerinner a', {timeout: 10000}).should('have.length', 186);
    cy.get('.intro > .w3-btn', {timeout: 10000}).should('be.visible').click({force: true});

    cy.get('#leftmenuinnerinner a', {timeout: 10000}).each(($el, index) => {
        if (index < 16) {
            cy.wrap($el).should('have.text', this.itemdata[index]);
        }
    });

    cy.url().should('eq', Cypress.env('url') + "/js/js_intro.asp");

    cy.get('[href="js_object_display.asp"]').should('contain', 'JS Object Display').click();

    cy.get('h1', {timeout: 10000}).should('contain', 'JS Object Display');
    cy.wait(2000);

    cy.url().should('eq', Cypress.env('url') + "/js/js_object_display.asp");

    document.addEventListener("DOMContentLoaded", function () {
        scrollToTextInPanel('leftmenuinnerinner', ' HTML DOM Objects ')
    })
});
