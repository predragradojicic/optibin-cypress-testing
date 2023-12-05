/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';
import InputFields from '../../support/page_objects/input-fields';
import Button from '../../support/page_objects/buttons';

describe('Testing cases when Run button is enabled on Bining page.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitBiningPage();

    })
       
    it('Testing cases when Run button is enabled on Bining page.', () => {
        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        // Sellect a bining product with two channels.
        SelectProducts.openFolder('Foo');

        // "Run" button should be disabled.
        Button.Run().should('be.disabled');

        // Channels.
        const channels = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];

        // Run button should be enabled only if a value greather than 0 is entered in these fields: Number Of Setups, Spool Size and at least one Inventory Count.
        channels.forEach((channel) => {

            cy.get('.app-products-channels-block-item')
                .contains(channel)
                .click();

            // Type 5 in the first Inventory Count.
            InputFields.firstInventoryCount().type('{selectall}').type('5');

            // "Run" button should be disabled.
            Button.Run().should('be.disabled');

            // Fill Number Of Setups.
            InputFields.numberOfSetups().clear().type('3');

            // "Run" button is disabled when Spool Size is 0.
            Button.Run().should('be.disabled');

            // Fill Spool Size.
            InputFields.spoolSize().clear().type('30');

            // "Run" button should be enabled.
            Button.Run().should('not.be.disabled');

            // "Run" button is disabled when Inventory Count is 0.
            InputFields.firstInventoryCount().clear();
            Button.Run().should('be.disabled');

            // "Run" button is disabled when Number Of Setups is 0.
            InputFields.firstInventoryCount().type('{selectall}').type('5');
            InputFields.numberOfSetups().clear();
            Button.Run().should('be.disabled');

            // "Run" button is disabled when Number Of Setups has incorrect value.
            InputFields.numberOfSetups().type('4.5');
            Button.Run().should('be.disabled');

            // "Run" button is disabled when Number Of Setups has incorrect value.
            InputFields.numberOfSetups().clear().type('3');
            InputFields.spoolSize().clear().type('4.5');
            Button.Run().should('be.disabled');

        });

    })

})