/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';

// Open a folder.
// const openFolder = (folder_name) => {

//     // Select a folder from the Products menu.
//     cy.get('.app-nav-map-item')
//         .contains(folder_name)
//         .click();
// };

describe('Testing funcionality of Products menu on Products page.', () => {

     // Log in and visit Products page.
     beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitProductsPage();
    
    })

    it('Test "Products" breadcrumb navigation.', () => {

        // const select_products = new SelectProducts();
        // Click on Products in the breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Products')
            .click();

        // Products page is displayed.
        SelectProducts.productsPageIsOpen();

    });

    it('Select a folder which is not empty.', () => {
        
        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        cy.wait(1000);

        // Confirm that Test P6 is displayed. Pass: menu item, title and folder item.
        SelectProducts.folderIsOpenOnProductsPage('Foo', 'Test P6', 'Foo');

    });

    it('Test "Products/folder" breadcrumb navigations.', () => {

        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        // Click on "Test P6" on the breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Test P6')
            .click();

        // Confirm that Test P6 is displayed. Pass: menu item, title and folder item.
        SelectProducts.folderIsOpenOnProductsPage('Foo', 'Test P6', 'Foo');

        // Go to "Products" using the breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Products')
            .click();

        cy.wait(1000);

        // Products page is displayed.
        SelectProducts.productsPageIsOpen();

    });

    it('Select an empty folder within another folder.', () => {

        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        // Open Bar 1 folder.
        SelectProducts.openFolder('Bar 1');

        cy.wait(1000);

        // Confirm that Test P6 is displayed. Pass: menu item, title and folder item.
        SelectProducts.folderIsOpenOnProductsPage('No items', 'Bar 1', 'No Items');

    });

    it('Test "folder/folder" breadcrumb navigations.', () => {
        
        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        // Open Bar 1 folder.
        SelectProducts.openFolder('Bar 1');

        // Test "folder->folder" breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Bar 1')
            .click();

        // Confirm that Test P6 is displayed. Pass: menu item, title and folder item.
        SelectProducts.folderIsOpenOnProductsPage('No items', 'Bar 1', 'No Items');

        // Test "folder<-folder" breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Test P6')
            .click();

        // Confirm that Test P6 is displayed. Pass: menu item, title and folder item.
        SelectProducts.folderIsOpenOnProductsPage('Foo', 'Test P6', 'Foo');
    });

    it('Select a fixture within a folder.', () => {

        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        // Click on Foo.
        SelectProducts.openFolder('Foo');

        // Confirm that fixture Foo is open. Pass: menu item, title and body messagge.
        SelectProducts.fixtureIsOpen('Foo', 'Foo', 'No Selected Channel');
        
    });

    it('Test "folder/fixture" breadcrumd navigation.', () => {
        
        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');
        cy.wait(1000);

        // Open Foo fixture.
        SelectProducts.openFolder('Foo');
        cy.wait(1000);

        // Test "folder<-fixture" breadcrumb navigation.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains('Test P6')
            .click();

        cy.wait(1000);
        
        // Confirm that Test P6 is displayed. Pass: menu item, title and folder item.
        SelectProducts.folderIsOpenOnProductsPage('Foo', 'Test P6', 'Foo');

    });

    it('Testing the search bar.', () => {

        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

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