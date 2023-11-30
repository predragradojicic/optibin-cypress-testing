// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginToOptibin", () => {

    // Visit url.
    cy.visit('http://3.224.166.164/')
    // Fill in credentials from a JSON file.
    cy.fixture('login-credentials.json').then((loginData) => {

        cy.get('#username').type(loginData.admin);
        cy.get('#password').type(loginData.passwordA);

    })
    // Click on Log in button.
    cy.get('.interact-identity-main-button').contains('Log in').click();
    // Confirm that the home page is displayed.
    cy.get('.active').should('contain', 'Home');

});

Cypress.Commands.add("visitProductsPage", () => {

    // Select Products page from the main menu.
    cy.get('.app-layout-sidebar > .app-sidebar > .app-sidebar-item  ')
        .contains('Products')
        .click({ force: true });
    // Confirm that Products page is displayed.
    cy.get('.app-products-folder-item')
        .contains('Test P6');

    cy.get('.app-products-content > .app-width-100.app-text-center.mt10.mb10')
        .should('not.exist');
});

Cypress.Commands.add("visitBiningPage", () => {

    // Seect Bining page from the main menu.
    cy.get('.app-layout-sidebar > .app-sidebar > .app-sidebar-item  ')
        .contains('Bining')
        .click({ force: true });
    // Confirm that Bining page is displayed.
    cy.get('.app-products-content > .app-width-100.app-text-center.mt10.mb10')
        .contains('Binning');

});

Cypress.Commands.add("visitQueryPage", () => {

    // Seect Query page from the main menu.
    cy.get('.app-layout-sidebar > .app-sidebar > .app-sidebar-item  ')
        .contains('Query')
        .click({ force: true });
    // Confirm that Query page is displayed.
    cy.get('.app-btn-secondary')
        .contains('Query');
});

Cypress.Commands.add("visitAccountsPage", () => {

    // Seect Accounts page from the main menu.
    cy.get('.app-layout-sidebar > .app-sidebar > .app-sidebar-item  ')
        .contains('Accounts')
        .click({ force: true });
    // Confirm that Accounts page is displayed.
    cy.get('.app-accounts > .app-accounts-header > .active')
        .contains('Users');
});