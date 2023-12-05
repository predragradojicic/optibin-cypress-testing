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
        SelectProducts.openFolder('Test P6');

        // Sellect a bining product with two channels.
        SelectProducts.openFolder('Foo');

        // Fill Number Of Setups and Spool Size.
        InputFields.numberOfSetups().clear().type('3');
        InputFields.spoolSize().clear().type('30');

        // Channels.
        const values = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];

        values.forEach((value, valueIndex) => {

            // This inner forEach loop runs only during the first iteration of the outer loop.
            if (valueIndex === 0) {

                values.forEach((value) => {

                    // Select a channel.
                    cy.get('.app-products-channels-block-item')
                        .contains(value)
                        .click();
        
                    // Type 5 in the first Inventory Count.
                    InputFields.firstInventoryCount().type('{selectall}').type('5');
                
                });
            }

            // Select a channel.
            cy.get('.app-products-channels-block-item')
                .contains(value)
                .click();

            // Click on Reset.
            Button.Reset().click();

            // All inputs are 0.
            InputFields.firstInventoryCount().should('have.value', '0');
            InputFields.numberOfSetups().should('have.value', '0');
            InputFields.spoolSize().should('have.value', '0');
            
        });

        
        
    })
})