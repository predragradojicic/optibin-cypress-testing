
/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';
import InputFields from '../../support/page_objects/input-fields';
import Button from '../../support/page_objects/buttons';
import BiningResult from '../../support/page_objects/bining-result';

describe('Saving a bining result on the Bining page. The result should be saved on Query page.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitBiningPage();

    })
       
    it('Saving a bining result on the Bining page. The result should be saved on Query page.', () => {
        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        // Sellect a bining product with two channels.
        SelectProducts.openFolder('Foo');

        // Fill Inventory Count fields on both channels.
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

        // Go to Query page.
        cy.visitQueryPage();

        // Find the last saved bining result.
        cy.get('.app-nav-map-items > :nth-child(10)').click();
        cy.get('.app-nav-map-items > :nth-child(4)').click();
        cy.get('.app-query-filter > :nth-child(1) > .app-input').clear();
        cy.get('.app-query-filter > :nth-child(1) > .app-input').type('2020-10-10');
        cy.get(':nth-child(2) > .app-input').clear();
        cy.get(':nth-child(2) > .app-input').type('2033-10-10');
        cy.get('.app-btn-secondary').contains('Query').click();
        cy.wait(1000);
        cy.get('.app-query-results-item').last().click();
        cy.wait(3000);

        // Confirm that bining result is displayed on the page for each channel. Pass: channels.
        BiningResult.biningResult(channels);

    })
})