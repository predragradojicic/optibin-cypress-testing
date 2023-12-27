/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';

describe('Testing funcionality of the main menu.', () => {

     // Log in.
     beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
    
    })

    it('Testing the search bar.', () => {
    
        // Type "Test" in the search bar.
        SelectProducts.searchBar().type('Test');

        cy.get('.app-manufacturers-nav-map-wrapper > .app-nav-map > .app-nav-map-items > .app-nav-map-item')
            .should('have.length', 5)
            .and('contain', 'Test');

        SelectProducts.searchBar().clear().type('Test P3');

        cy.get('.app-manufacturers-nav-map-wrapper > .app-nav-map > .app-nav-map-items > .app-nav-map-item')
            .should('have.length', 1)
            .and('contain', 'Test P3');
    
        // // Clear the search bar.
        SelectProducts.searchBar().clear();
        cy.wait(1000);
    
        // Check: All items are visible again.
        SelectProducts.productInMenu('Cree (ML-E,ML-B)');
 
    });

    it('Testing functionality of the Manufacturers menu: open two different manufacturers.', () => {

        // Open Test P1 manufacturer.
        SelectProducts.productInMenu('Test P1');

        // Confirm that manufacturer Test P1 is open.
        SelectProducts.folderIsOpenOnManufacturersPage('Test P1');

        // Open Test P2 manufacturer.
        SelectProducts.productInMenu('Test P2');

        // Confirm that manufacturer Test P2 is open.
        SelectProducts.folderIsOpenOnManufacturersPage('Test P2');

    });

});