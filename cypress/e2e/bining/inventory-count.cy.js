/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';
import IncorrectValues from '../../support/page_objects/incorrect-values';
import CorrectValues from '../../support/page_objects/correct-values';
import InputArrows from '../../support/page_objects/input-arrows';

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
    
        const values = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];

        values.forEach((value) => {

            // Find the input element using :nth-child(3) > .app-input
            cy.get('.app-products-channels-block-item')
                .contains(value)
                .click();

            IncorrectValues.incorrectValues('incorrect-inventory.json', ':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input');
            IncorrectValues.unsupportedInventory('unsupported-inventory.json', ':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input');
            CorrectValues.correctValues(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input');

            InputArrows.inputArrows('.app-product-bining > :nth-child(1) > :nth-child(1) > div > :nth-child(2) > :nth-child(3) > .app-input');
            
        });

    })
})