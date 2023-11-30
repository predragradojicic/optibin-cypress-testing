/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';

describe('Testing PCA Number on the Bining page.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitBiningPage();

    })
       
    it('Testing Comment on the Bining page.', () => {

        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        // Sellect a bining product which contains channels.
        SelectProducts.openFolder('Foo');

        // Click on a chromaticity channel.
        cy.get('.app-products-channels-block-item')
            .contains('Chrom 1 P3 (test 6)')
            .click();

        // Confirm that the channel is displayed.
        cy.get('.app-text-gray')
            .contains('Inventory Count:')

        // Click on a wavelength channel.
        cy.get('.app-products-channels-block-item')
            .contains('Wav 01 P2 (test 6)')
            .click();

        // Confirm that the channel is displayed.
        cy.get('.app-text-gray')
            .contains('Inventory Count:')
     
    })
})