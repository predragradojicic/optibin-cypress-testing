/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';
import InputFields from '../../support/page_objects/input-fields';
import Button from '../../support/page_objects/buttons';

describe('Testing Reset button on the Bining page.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitBiningPage();

    })
       
    it('Testing Reset button on the Bining page.', () => {
        // Open Test P6 folder.
        SelectProducts.productInMenu('Test P6');

        // Sellect a bining product with two channels.
        SelectProducts.productInMenu('Foo');

        // Fill Number Of Setups and Spool Size.
        InputFields.numberOfSetups().clear().type('{selectall}, 3');
        InputFields.spoolSize().clear().type('{selectall}, 30');

        const channels = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];

        channels.forEach((channel) => {

            // Select a channel.
            cy.get('.app-products-channels-block-item').contains(channel).click();

            InputFields.firstInventoryCount().clear().type('{selectall}, 5');

        });

        Button.Reset().click();

        channels.forEach((channel) => {

            // Select a channel.
            cy.get('.app-products-channels-block-item').contains(channel).click();

            // All inputs are 0.
            InputFields.firstInventoryCount().should('have.value', '0');
            InputFields.numberOfSetups().should('have.value', '0');
            InputFields.spoolSize().should('have.value', '0');
            
        });
    })
})