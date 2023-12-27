/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';

describe('Testing funcionality of Products menu on Products page.', () => {

     // Log in and visit Products page.
     beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitProductsPage();
    
    })

    it('Select a folder; select an empty folder inside another folder.', () => {

        // Open Test P6 folder.
        SelectProducts.productInFolders('Test P6');

        // Confirm that Test P6 is displayed. Pass: all items from the menu.
        SelectProducts.folderIsOpenOnProductsPage('Test P6', 'Bar 1', 'Bar 2', 'Foo');

        // Open Bar 1 folder.
        SelectProducts.productInFolders('Bar 1');
        cy.wait(1000);

        // Confirm that Bar 1 is displayed. Pass: menu item and folder item.
        SelectProducts.folderIsOpenOnProductsPage('Bar 1', 'No items');

    });

    it('Select a fixture; select a fixture inside a folder.', () => {

        // Click on Foo.
        SelectProducts.productInFolders('Test P3');
        cy.wait(1000);

        SelectProducts.fixtureIsOpen('Test P3', 'No Selected Channel');

        SelectProducts.productInBreadcrumbMenu('Products');

        // Open Test P6 folder.
        SelectProducts.productInFolders('Test P6');
        cy.wait(1000);

        // Click on Foo.
        SelectProducts.productInFolders('Foo');
        cy.wait(1000);

        SelectProducts.fixtureIsOpen('Foo', 'No Selected Channel');

    });
});