/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';
import IncorrectValues from '../../support/page_objects/incorrect-values';
import CorrectValues from '../../support/page_objects/correct-values';
import InputFields from '../../support/page_objects/input-fields';

describe('Testing Inventory Count on the Bining page.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitBiningPage();

    })
       
    it('Testing Inventory Count on the Bining page.', () => {
        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        // Sellect a bining product which contains channels.
        SelectProducts.openFolder('Foo');
 
        const channels = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];

        // For each channel.
        channels.forEach((channel) => {

            // Select a channel.
            cy.get('.app-products-channels-block-item')
                .contains(channel)
                .click();

            // Confirm that all Inventory Count inputs are 0.
            cy.get('.app-input.ml5').each(($input) => {
        
                cy.wrap($input).should('have.value', '0');
        
            });

            // Type different incorrect values and unsupported values. Border should be red. Pass: JSON file from fixtures which contains incorrect values and the input field.
            IncorrectValues.incorrectValues('incorrect-inventory.json', ':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input');
            IncorrectValues.unsupportedInventory('unsupported-inventory.json', ':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input');
            // Type correct value and check if the input field has no red border and if that value is displayed. Pass: the input field.
            CorrectValues.correctValues(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input');
            // Test input arrows for increasing and decreasing values.
            InputFields.inputArrows('.app-product-bining > :nth-child(1) > :nth-child(1) > div > :nth-child(2) > :nth-child(3) > .app-input');
            
        });

        // Confirm that values are saved on different channels.
        InputFields.firstInventoryCount().type('{selectall}').type('20');
        cy.get('.app-products-channels-block-item').contains('Chrom 1 P3 (test 6)').click();
        InputFields.firstInventoryCount().type('{selectall}').type('30');
        cy.get('.app-products-channels-block-item').contains('Wav 01 P2 (test 6)').click();
        InputFields.firstInventoryCount().should('have.value', '20');
        cy.get('.app-products-channels-block-item').contains('Chrom 1 P3 (test 6)').click();
        InputFields.firstInventoryCount().should('have.value', '30');

    })
})