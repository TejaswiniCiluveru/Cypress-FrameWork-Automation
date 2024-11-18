import {w3Login} from '../../support/pageObjects/w3Login';

describe('W3Schools Test Suite', function () {
    before(function () {
        cy.fixture('searchData').then(function (data) {
            this.data = data;
        });
        cy.fixture('tutorial').then(function (itemdata) {
            this.itemdata = itemdata;
        });
    });
    it('should verify the page title and main sections', function () {
        const w3login = new w3Login();
        const url = Cypress.env('url');
        if (! url) {
            throw new Error('Environment URL is not defined. Set the "url" variable in cypress.config.js or cypress.json.');
        }
        w3login.goTo(url);
        cy.wait(2000);

        cy.get('a.user-anonymous.tnb-login-btn.w3-btn', {timeout: 10000}).click();
        cy.get('input[name="email"]').type(this.data.credentials.email);
        cy.get('button[type="submit"]').click();

        w3login.loginWithoutPassword(this.data.credentials.email);
        cy.get('.LoginForm_error_text__4fzmN', {timeout: 10000}).should('contain', this.data.messageNotification);

        cy.get('input[name="email"]').clear();
        w3login.login(this.data.credentials.email, this.data.credentials.password);
        cy.get('.LoginForm_error_text__4fzmN', {timeout: 10000}).should('contain', "Make sure you type your email and password correctly. Both your password and email are case-sensitive.");

        cy.get('input[name="password"]').clear();
        cy.get('input[name="email"]').clear();
        w3login.login(this.data.credentials.email, this.data.credentials.crctPassword);

        pageValidation.call(this);

        cy.get('input[placeholder="Search..."]', {timeout: 10000}).type('javascript').click();
        cy.get('#tnb-search-suggestions', {timeout: 10000}).should('be.visible').find('.search-suggestion-link').contains(this.data.constantText.javaScriptTutorial).click();

        Cypress.config('defaultCommandTimeout', 18000);
        cy.url().should('eq', Cypress.env('url') + "/js/default.asp");

        cy.get('#leftmenuinnerinner > :nth-child(1)', {timeout: 10000}).should('contain', 'JS Tutorial');

        const links = document.querySelectorAll('#leftmenuinnerinner a');
        links.forEach(link => {
            console.log(link.textContent.trim());
        });

        // cy.get('#leftmenuinnerinner a', {timeout: 10000}).should('have.length', 186);
        cy.get('.intro > .w3-btn', {timeout: 10000}).should('be.visible').click({force: true});

        cy.get('#leftmenuinnerinner a', {timeout: 10000}).each(($el, index) => {
            if (index < 16) {
                cy.wrap($el).should('have.text', this.itemdata[index]);
            }
        });

        cy.url().should('eq', Cypress.env('url') + "/js/js_intro.asp");

        cy.get('[href="js_object_display.asp"]').should('contain', 'JS Object Display').click();


        cy.url().should('eq', Cypress.env('url') + "/js/js_object_display.asp");

        document.addEventListener("DOMContentLoaded", function () {
            scrollToTextInPanel('leftmenuinnerinner', ' HTML DOM Objects ')
        })
        cy.contains('Try it Yourself').should('have.attr', 'href', 'tryit.asp?filename=tryjs_object_display').then((href) => { // Visit the link in the same tab
            cy.visit(Cypress.env('url') + '/js/tryit.asp?filename=tryjs_object_display');
        });


        cy.url().should('include', '/tryit.asp?filename=tryjs_object_display');
        cy.get('iframe#iframeResult').should('exist');
        cy.frameLoaded('#iframeResult');

        cy.iframe('#iframeResult').then(($iframe) => {
            const $body = $iframe.contents().find('[object Object]');

            // Verify that body exists
            expect($body).to.exist;

            // Inject updated HTML
            const updatedHTML = `
                <html>
                    <body>
                        <script>
                            const person = {
                                name: "Tejuu",
                                age: 25,
                                city: "Los Angeles"
                            };
                            document.getElementById('demo').innerHTML = person.name;
                        </script>
                        <p id="demo"></p>
                    </body>
                </html>
            `;
            cy.wrap($body).invoke('html', updatedHTML);
        });

        // Click the "Run" button (outside the iframe)
        cy.get('#runbtn').click();

        // Validate the output in the iframe
        cy.iframe('#iframeResult').within(() => {
            cy.get('#demo').should('have.text', 'Tejuu');
        });

    });
});
function pageValidation() {
    cy.get('.tnb-dashboard-btn', {timeout: 10000}).should('be.visible').and('contain.text', this.data.constantText.myW3Schools);
};
function scrollToTextInPanel(panelId, targetText) {
    const panel = document.getElementById(panelId);
    const elements = panel.querySelectorAll('span');
    for (const element of elements) {
        if (element.textContent.trim() === targetText) {
            horizontallyelement.scrollIntoView({behavior: "smooth", block: "nearest", inline: "start"});
            break;
        }
    }
}
