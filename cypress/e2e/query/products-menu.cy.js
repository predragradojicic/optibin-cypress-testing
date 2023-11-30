/// <reference types="cypress" />

describe('Testing funcionality of the main menu.', () => {

     // Log in.
     beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitQueryPage();
    
    })


    it('Select a folder and test breadcrumb navigation.', () => {

        // Open Test P6 folder.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P6')
            .click();

        // Confirm that Test P6 menu is displayed.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Foo')

        // Test breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Test P6')
            .click();

    });

    it('Select a folder within a folder and test breadcrumb navigation.', () => {

        // Open Test P6 folder.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P6')
            .click();

        // Open Bar 1 folder.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Bar 1')
            .click();

        // Test breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Bar 1')
            .click();

    });


    it('Go to previous folder using the breadcrumb navigation.', () => {

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

    });


    it('Select a fixture within a folder and test breadcrumb navigation.', () => {

        // Open Test P6 folder.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P6')
            .click();

        // Click on Foo.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Foo')
            .click();

        // Confirm that Foo is added to the navigation. 
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item.active')
            .contains('Foo')

    });

    it('Go to previous folder using the breadcrumb navigation.', () => {

        // Open Test P6 folder.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P6')
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


    it('Testing search bar.', () => {

        // Open Query page.
        cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(5) > .noactive').click();

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
        cy.get('.app-nav-map-filter')
            .find('.app-input')
            .type('Bar');
    
        // Check: Only "Test" is visible.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .should('have.length', 4)
            .and('contain', 'Bar');
    
        // // Clear the search bar.
        cy.get('.app-nav-map-filter')
            .find('.app-input')
            .clear();
    
        // Check: All items are visible again.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .should('have.length', 3);

    });

});