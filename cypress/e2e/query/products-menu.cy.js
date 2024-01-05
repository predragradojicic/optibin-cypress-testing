/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';

describe('Testing funcionality of the main menu.', () => {

     // Log in.
     beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitQueryPage();
    
    })

    it('Select a folder; select an empty folder inside another folder.', () => {

        // Open Test P6 folder.
        SelectProducts.productInMenu('Test P6');

        // Confirm that Test P6 is displayed. Pass: all items from the menu.
        SelectProducts.folderIsOpenOnQueryPage('Test P6', 'Bar 1', 'Bar 2', 'Foo');

        // Open Bar 1 folder.
        SelectProducts.productInMenu('Bar 1');

        // Confirm that Bar 1 is displayed. Pass: menu item and folder item.
        SelectProducts.folderIsOpenOnQueryPage('Test P6', 'No items');

    });

    it('Select a fixture; select a fixture inside a folder.', () => {

        // Click on Foo.
        SelectProducts.productInMenu('Test P3');

        SelectProducts.fixtureIsOpenOnQuery('Test P3');
        
        // Open Test P6 folder.
        SelectProducts.productInMenu('Test P6');

        // Click on Foo.
        SelectProducts.productInMenu('Foo');

        SelectProducts.fixtureIsOpenOnQuery('Foo');

    });

    it('Test breadcrumb navigation: Products/folder/folder', () => {

        // Click on Products in the breadcrumb navigation.
        SelectProducts.productInBreadcrumbMenu('Products');

        // Bining page is displayed.
        SelectProducts.queryPageIsOpen();

        // Open Test P6 folder.
        SelectProducts.productInMenu('Test P6');

        // Click on "Test P6" on the breadcrumb navigation.
        SelectProducts.productInBreadcrumbMenu('Test P6');

        // Confirm that Test P6 is displayed. Pass: all items from the menu.
        SelectProducts.folderIsOpenOnQueryPage('Test P6', 'Bar 1', 'Bar 2', 'Foo');

        // Open Bar 1 folder.
        SelectProducts.productInMenu('Bar 1');

        // Click on "Test P6" on the breadcrumb navigation.
        SelectProducts.productInBreadcrumbMenu('Bar 1');

        // Confirm that Test P6 is displayed. Pass: menu item and folder item.
        SelectProducts.folderIsOpenOnQueryPage('Test P6', 'No items');

        // Click on "Test P6" on the breadcrumb navigation.
        SelectProducts.productInBreadcrumbMenu('Test P6');

        // Confirm that Test P6 is displayed. Pass: all items from the menu.
        SelectProducts.folderIsOpenOnQueryPage('Test P6', 'Bar 1', 'Bar 2', 'Foo');

        // Click on Products in the breadcrumb navigation.
        SelectProducts.productInBreadcrumbMenu('Products');

        // Bining page is displayed.
        SelectProducts.queryPageIsOpen();

    });

    it('Testing search bar.', () => {

        // Open Test P6 folder.
        SelectProducts.productInMenu('Test P6');

        // Initial check: All items are visible.
        SelectProducts.numberOfProducts(3);
    
        // Type "Test" in the search bar.
        cy.get('.app-nav-map-filter').find('.app-input').type('Bar');

        SelectProducts.numberOfProducts(4).then((additional) => {
            // Use .wrap to pass the subject to a function
            cy.wrap(additional).and('contain', 'Bar');
          });

        SelectProducts.searchBar().clear().type('Bar 1');

        SelectProducts.numberOfProducts(2).then((additional) => {
            // Use .wrap to pass the subject to a function
            cy.wrap(additional).and('contain', 'Bar 1');
          });
    
        // // Clear the search bar.
        cy.get('.app-nav-map-filter').find('.app-input').clear();
    
        // Check: All items are visible again.
        SelectProducts.numberOfProducts(3);

    });

});