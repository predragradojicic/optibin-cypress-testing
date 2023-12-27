/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';
import InputFields from '../../support/page_objects/input-fields';
import Button from '../../support/page_objects/buttons';
import BiningResult from '../../support/page_objects/bining-result';


describe('Start a run on Bining page.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitBiningPage();

    })
       
    it('Start a run on Bining page.', () => {
        // Open Test P6 folder.
        SelectProducts.productInMenu('Test P6');

        // Sellect a bining product with two channels.
        SelectProducts.productInMenu('Foo');

        // Fill all Inventory Count in both channels. Pass: value.
        const channels = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];
        
        InputFields.fillInventoryCount(channels, 55);

        // Fill Number Of Setups and Spool Size, and then start a run.
        InputFields.numberOfSetups().clear().type('{selectall}, 3');
        InputFields.spoolSize().clear().type('{selectall}, 30');
        Button.Run().click();
        cy.wait(6000);

        // Confirm all button's presence.
        Button.Run().should('not.exist');
        Button.Reset().should('not.exist');
        Button.Upload().should('not.exist');
        Button.Download().should('not.exist');

        Button.Save().should('exist');
        Button.Cancel().should('exist');
        Button.Export().should('exist');

        // Confirm that bining result is displayed on the page for each channel. Pass: channels.
        BiningResult.biningResult(channels);
        
    })
})