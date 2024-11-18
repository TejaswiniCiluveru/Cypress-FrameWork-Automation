export class w3Login {
    goTo(url) {
        if (!url) {
            throw new Error('URL is not defined. Please provide a valid URL.');
        }
        cy.visit(url); // Use the `url` variable directly
    }
    login(email, password = None) {

        cy.loginPage(email, password)

    }
    loginWithoutPassword(email) { // cy.get('a.user-anonymous.tnb-login-btn.w3-btn', {timeout: 10000}).click();
        cy.get('input[name="email"]').type(email);
        cy.get('button[type="submit"]').click();

    }
}
