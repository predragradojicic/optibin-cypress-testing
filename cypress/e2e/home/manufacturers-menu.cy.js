/// <reference types="cypress" />

describe('Testing funcionality of the main menu.', () => {

     // Log in.
     beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
    
    })

        
    it('Testing the search bar.', () => {
    
        // Type "Test" in the search bar.
        cy.get('.app-input')
            .type('Test');
    
        // Check: Only "Test" is visible.
        cy.get('.app-manufacturers-nav-map-wrapper > .app-nav-map > .app-nav-map-items > .app-nav-map-item')
            .should('have.length', 5)
            .and('contain', 'Test');
    
        // // Clear the search bar.
        cy.get('.app-input')
            .clear();
    
        // Check: All items are visible again.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('devMarina');

    });

    it('Testing functionality of the Manufacturers menu.', () => {

        // Open Test P1 manufacturer.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P1')
            .click();

        // Confirm that Test P1 menu is displayed.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item.active')
            .contains('Test P1');

        // Confirm that manufacturer Test P1 is open.
        cy.get('.app-manufacturers-header-title-text.mb10')
            .find('.app-manufacturers-header-title-text-active')
            .contains('Test P1');

        // Open Test P2 manufacturer.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P2')
            .click();

        // Confirm that Test P2 menu is displayed.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item.active')
            .contains('Test P2');

        // Confirm that manufacturer Test P2 is open.
        cy.get('.app-manufacturers-header-title-text.mb10')
            .find('.app-manufacturers-header-title-text-active')
            .contains('Test P2');

    });

});