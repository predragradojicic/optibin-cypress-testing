/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';
import InputFields from '../../support/page_objects/input-fields';
import Button from '../../support/page_objects/buttons';

describe('Testing Insufficient Inventory case on the Bining page.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitBiningPage();

    })
       
    it('Testing Insufficient Inventory case on the Bining page.', () => {
        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        // Sellect a bining product with two channels.
        SelectProducts.openFolder('Foo');

        // Select a channel.
        cy.get('.app-products-channels-block-item').contains('Chrom 1 P3 (test 6)').click();

        // Fill one Inventory Count, Number Of Setups and Spool Size.
        InputFields.firstInventoryCount().type('{selectall}').type('5');
        InputFields.numberOfSetups().clear().type('3');
        InputFields.spoolSize().clear().type('30');

        // The close and OK buttons in the insufficent inventory window.
        const buttons = ['.app-modal-content-close > img', '.app-yes-no-modal > .app-btn-secondary'];

        buttons.forEach((button) => {
    
            // Run.
            Button.Run().click();
            cy.wait(5000);

            // Confirm body text and click on one of the buttons.
            cy.get('.app-yes-no-modal > h2').should('contain', 'Binning action failed: The following channels might have insufficent inventory!');
            cy.get(button).click();
                
            // The window is closed. Input values are saved. Run button is enabled.
            InputFields.firstInventoryCount().should('have.value', '5');
            InputFields.numberOfSetups().should('have.value', '3');
            InputFields.spoolSize().should('have.value', '30');
            Button.Run().should('not.be.disabled');

        });

    })
})