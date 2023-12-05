/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';
import InputFields from '../../support/page_objects/input-fields';
import Button from '../../support/page_objects/buttons';

describe('Testing Cancel button on Bining page.', () => {

    // Log in.
    before(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitBiningPage();

    })
       
    it('Testing Cancel button on Bining page.', () => {
        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        // Sellect a bining product with two channels.
        SelectProducts.openFolder('Foo');

        const channels = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];

        // Fill Inventory Count on both channels. Pass: channels and value.
        InputFields.fillInventoryCount(channels, 55);

        // Fill Number Of Setups and Spool Size, and then click on Run.
        InputFields.numberOfSetups().clear().type('3');
        InputFields.spoolSize().clear().type('30');
        Button.Run().click();
        cy.wait(6000);

        // Click on Cancel.
        Button.Cancel().click();

        // Confirm all button's presence.
        Button.Run().should('not.be.disabled');
        Button.Reset().should('exist');
        Button.Upload().should('exist');
        Button.Download().should('exist');

        Button.Save().should('not.exist');
        Button.Cancel().should('not.exist');
        Button.Export().should('not.exist');
        Button.Finish().should('not.exist');

        // Inventory Count is saved on both channels.
        InputFields.firstInventoryCount().should('have.value', '55');

        cy.get('.app-products-channels-block-item')
                .contains(channels[0])
                .click();
                
        InputFields.firstInventoryCount().should('have.value', '55');

        // Number Of Setups and Spool Size values are saved.
        InputFields.numberOfSetups().should('have.value', '3');
        InputFields.spoolSize().should('have.value', '30');
        
    })
})