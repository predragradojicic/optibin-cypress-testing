/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';
import InputFields from '../../support/page_objects/input-fields';
import Button from '../../support/page_objects/buttons';
import BiningResult from '../../support/page_objects/bining-result';

describe('Testing Save button on the Bining page.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitBiningPage();

    })
       
    it('Testing Save button on the Bining page.', () => {
        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        // Sellect a bining product with two channels.
        SelectProducts.openFolder('Foo');

        const channels = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];
        
        InputFields.fillInventoryCount(channels, 55);

        // Fill Number Of Setups and Spool Size, and then start a run.
        InputFields.numberOfSetups().clear().type('3');
        InputFields.spoolSize().clear().type('30');
        Button.Run().click();
        cy.wait(6000);

        // Save.
        Button.Save().click();
        cy.wait(2000);

        // Confirm all button's presence.
        Button.Run().should('not.exist');
        Button.Reset().should('not.exist');
        Button.Upload().should('not.exist');
        Button.Download().should('not.exist');

        Button.Save().should('not.exist');
        Button.Cancel().should('not.exist');

        Button.Finish().should('exist');
        Button.Export().should('exist');

        // Confirm that bining result is displayed on the page for each channel. Pass: channels.
        BiningResult.biningResult(channels);

    })
})