/// <reference types="cypress" />

describe('Testing funcionality of the main menu.', () => {

     // Log in.
     beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
    
    })

        
    it('Testing search bar.', () => {

        // Open Products page.
        cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(3) > .noactive').click();

        // Open Test P6 folder.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P6')
            .click();

        // Initial check: All items are visible.
        cy.get('.app-nav-map-items')
          .find('.app-nav-map-item')
          .should('have.length', 3);
    
        // Type "Test" in the search bar.
        cy.get('.app-input')
            .type('Bar');
    
        // Check: Only "Test" is visible.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .should('have.length', 4)
            .and('contain', 'Bar');
    
        // // Clear the search bar.
        cy.get('.app-input')
            .clear();
    
        // Check: All items are visible again.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .should('have.length', 3);

    });

    it('Testing functionality of the Products menu.', () => {

        // Open Products page.
        cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(3) > .noactive').click();

        // Open Test P6 folder.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P6')
            .click();

        // Confirm that Test P6 menu is displayed.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Foo')

        // Confirm that folder Test P6 is open.
        cy.get('.app-products-header-title-text.mb10')
            .find('.app-products-header-title-text-active')
            .contains('Test P6')

        // Test breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Test P6')
            .click();

        // Open Bar 1 folder.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Bar 1')
            .click();

        // Confirm that folder Test P6 is open.
        cy.get('.app-products-header-title-text.mb10')
            .find('.app-products-header-title-text-active')
            .contains('Bar 1')

        // Test breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Bar 1')
            .click();

        // Click on Test P6.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Test P6')
            .click();

        // Confirm that Bar 1 is removed from the navigation. 
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Bar 1')
            .should('not.exist');

        // Confirm that folder Test P6 is open.
        cy.get('.app-products-header-title-text.mb10')
            .find('.app-products-header-title-text-active')
            .contains('Test P6')

        // Click on Foo.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Foo')
            .click();

        // Confirm that fixture Foo is open.
        cy.get('.app-products-header-title-text.mb10')
            .find('.app-products-header-title-text-active')
            .contains('Foo')

        // Confirm that Foo is added to the navigation. 
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item.active')
            .contains('Foo')

        // Test breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Products')
            .click();

        // Confirm that Test P6 and Foo removed from the navigation. 
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Test P6')
            .should('not.exist');

        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Foo')
            .should('not.exist');


    });

});