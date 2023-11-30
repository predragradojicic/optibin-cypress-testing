/// <reference types="cypress" />

describe('Testing funcionality of Products menu on Bining page.', () => {

    // Log in and visit Bining page.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitBiningPage();
    
    })

    it('Test "Products" breadcrumb navigation.', () => {
        // Click on Products in the breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Products')
            .click();
        // Products page is displayed.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P6');
            cy.get('.app-products-folder-item')
            .contains('Test P6');
    });

    it('Select a folder.', () => {

        // Open Test P6 folder.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P6')
            .click();

        // Confirm that folder Test P6 is open.
        cy.get('.app-products-folder-item')
            .contains('Foo')

        // Confirm that Test P6 menu is displayed.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Foo');

    });


    it('Test "Products/folder" breadcrumb navigations.', () => {

        // Open Test P6 folder.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P6')
            .click();

        // Test "Test P6" breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Test P6')
            .click();
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Foo');
        cy.get('.app-products-folder')
            .find('.app-products-folder-item')
            .contains('Foo');

        // Go back on "Products" using breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Products')
            .click();

        cy.wait(1000);

        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P6');
        cy.get('.app-products-folder-item')
            .contains('Test P6');

    });

    it('Select a folder within a folder.', () => {

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

        // Confirm that folder Bar 1 is open.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Bar 1');
        cy.get('.app-products-folder')
            .find('.app-text-center.app-text-gray')
            .contains('No Items');

    });

    it('Test "folder/folder" breadcrumb navigations.', () => {
        
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

        // Test "folder->folder" breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Bar 1')
            .click();

        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Bar 1');
        cy.get('.app-products-folder')
            .find('.app-text-center.app-text-gray')
            .contains('No Items');

        // Test "folder<-folder" breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Test P6')
            .click();
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Foo');
        cy.get('.app-products-folder')
            .find('.app-products-folder-item')
            .contains('Foo');
    });

    it.only('Select a fixture within a folder.', () => {

        // Open Test P6 folder.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P6')
            .click();

        // Confirm that fixture Foo is open.
        cy.get('.app-products-header-title-text.mb10')
            .find('.app-products-header-title-text-active')
            .contains('Foo');

        // Click on Foo.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item.active')
            .contains('Foo')
            .click();

    });

    it('Test "folder/fixture" breadcrumd navigation.', () => {
        
        // Open Test P6 folder.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P6')
            .click();

        cy.wait(1000);

        // Click on Foo.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Foo')
            .click();

        cy.wait(1000);

        // Test "folder<-fixture" breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Test P6')
            .click();

        cy.wait(1000);

        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Foo');

        cy.get('.app-products-folder-items')
            .find('.app-products-folder-item')
            .contains('Foo');

    });

    it('Testing the search bar.', () => {

        // Open Test P6 folder.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .contains('Test P6')
            .click();

        // Initial check: All items are visible.
        cy.get('.app-nav-map-items')
          .find('.app-nav-map-item')
          .should('have.length', 3);
    
        // Type a phrase which is a part of names of two different items in the search bar.
        cy.get('.app-input')
            .type('Bar');
    
        // Check if only that two items are visible.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .should('have.length', 4)
            .and('contain', 'Bar');
    
        // // Clear the search bar.
        cy.get('.app-input')
            .clear();
    
        // Check if all items are visible again.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item')
            .should('have.length', 3);

    });

});