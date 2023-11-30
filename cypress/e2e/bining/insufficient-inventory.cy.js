/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';

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

        // Sellect a bining product with no channels.
        SelectProducts.openFolder('Foo');

        const channels = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];

        channels.forEach((channel) => {

            cy.get('.app-products-channels-block-item')
                .contains(channel)
                .click();

            const buttons = ['.app-modal-content-close > img', '.app-yes-no-modal > .app-btn-secondary'];

            buttons.forEach((button) => {

                cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input')
                    .clear()
                    .type('{selectall}').type('5');

                cy.get('.mt10.app-flex > :nth-child(3) > .app-input')
                    .clear()
                    .type('3');
                cy.get('.mt10.app-flex > :nth-child(4) > .app-input')
                    .clear()
                    .type('30');

                cy.get('.app-btn-secondary').click();
                cy.wait(5000);
        
                cy.get('.app-yes-no-modal > h2').should('contain', 'Binning action failed: The following channels might have insufficent inventory!');
                cy.get(button).click();
                    
                cy.get('.app-yes-no-modal')
                    .should('not.exist');
                cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input')
                    .should('have.value', '5');
                cy.get('.app-flex > :nth-child(3) > .app-input')
                    .should('have.value', '3');
                cy.get('.app-flex > :nth-child(4) > .app-input')
                    .should('have.value', '30');
                cy.get('.app-btn-secondary')
                    .contains('Run')
                    .should('not.be.disabled');

            });

        });

    })
})