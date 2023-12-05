/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';
import InputFields from '../../support/page_objects/input-fields';
import Button from '../../support/page_objects/buttons';

describe('Testing Finish button on Bining page.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitBiningPage();

    })
       
    it('Testing Finish button on Bining page.', () => {
        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        // Sellect a bining product with two channels.
        SelectProducts.openFolder('Foo');

        // Channels.
        const channels = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];
        
        // Fill Inventory Count fields on both channels.
        InputFields.fillInventoryCount(channels, 55);

        // Fill Number Of Setups and Spool Size, and then start a run.
        InputFields.numberOfSetups().clear().type('3');
        InputFields.spoolSize().clear().type('30');
        Button.Run().click();
        cy.wait(6000);

        // Click on Save and Finish.
        Button.Save().click();
        cy.wait(2000);
        Button.Finish().click();
        cy.wait(2000);

        // Confirm all button's presence.
        Button.Run().should('be.disabled');
        Button.Reset().should('exist');
        Button.Upload().should('exist');
        Button.Download().should('exist');

        Button.Save().should('not.exist');
        Button.Cancel().should('not.exist');
        Button.Finish().should('not.exist');
        Button.Export().should('not.exist');

        // Number Of Setups and Spool Size are 0 and both have red borders.
        InputFields.numberOfSetups().should('have.class', 'app-border-red').and('have.value', '0');
        InputFields.spoolSize().should('have.class', 'app-border-red').and('have.value', '0');

        // Inventory Count is 0 on both channels.
        InputFields.firstInventoryCount().should('have.value', '0');
        
        cy.get('.app-products-channels-block-item')
                .contains(channels[0])
                .click();

        InputFields.firstInventoryCount().should('have.value', '0');

    })
})