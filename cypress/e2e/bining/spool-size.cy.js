/// <reference types="cypress" />

describe('Testing Spool Size on the Bining page.', () => {

    // Log in.
    beforeEach(() => {
       cy.loginToOptibin();
       cy.wait(1000);
   
   })

       
   it('Testing Spool Size on the Bining page.', () => {
       // Open Bining page.
       cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(4) > .noactive').click();

       // Open Test P6 folder.
       cy.get('.app-nav-map-items')
           .find('.app-nav-map-item')
           .contains('Test P6')
           .click();

       // Select Foo bining product.
       cy.get('.app-nav-map-items > :nth-child(4)')
            .click();

       // Spool size should have value 0.
       cy.get(':nth-child(4) > .app-input')
            .should('have.value', '0');

       // "Run" button should not be clickable.
       cy.get('.app-btn-secondary')
            .should('be.disabled');

       // Type incorrect value and check if the input field has red border.
       cy.get(':nth-child(4) > .app-input')
            .type('.');
       cy.get('.app-flex')
            .click();
       cy.get(':nth-child(4) > .app-input')
            .should('have.class', 'app-border-red');

       // "Run" button should not be clickable.
       cy.get('.app-btn-secondary')
            .should('be.disabled');

       // Type correct value and check if the input field has no red border and has that value.
       cy.get(':nth-child(4) > .app-input')
            .clear();
       cy.get(':nth-child(4) > .app-input')
            .type('6');
       cy.get('.app-flex')
            .click();
       cy.get(':nth-child(4) > .app-input')
            .click()
            .should('have.value', '6')
            .should('have.class', 'app-input');

   })

})