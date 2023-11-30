/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';

describe('Testing PCA Number on the Bining page.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitBiningPage();

    })

    const inputValues = [10, 20, 30];
       
    it('Testing Comment on the Bining page.', () => {
        // Open Test P6 folder.
        SelectProducts.openFolder('Test P6');

        // Sellect a bining product with no channels.
        SelectProducts.openFolder('Foo');

        // "Run" button should not be clickable.
        cy.get('.app-btn-secondary')
            .should('be.disabled');

        const channels = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];

        channels.forEach((channel) => {

            cy.get('.app-products-channels-block-item')
                .contains(channel)
                .click();

            cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input')
                .clear()
                .type('{selectall}').type('5');

            cy.get('.mt10.app-flex > :nth-child(3) > .app-input')
                .clear()
                .type('3');

            cy.get('.mt10.app-flex > :nth-child(4) > .app-input')
                .clear()
                .type('30');

            cy.get('.app-btn-secondary').should('be.enabled');


            cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input')
                .clear()
            cy.get('.app-btn-secondary').should('be.disabled');
            cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input')
                .clear()
                .type('{selectall}').type('5');

            cy.get('.mt10.app-flex > :nth-child(3) > .app-input')
                .clear()
            cy.get('.app-btn-secondary').should('be.disabled');
            cy.get('.mt10.app-flex > :nth-child(3) > .app-input')
                .clear()
                .type('3');

            cy.get('.mt10.app-flex > :nth-child(4) > .app-input')
                .clear()
            cy.get('.app-btn-secondary').should('be.disabled');
            cy.get('.mt10.app-flex > :nth-child(4) > .app-input')
                .clear()
                .type('30');

        });

    })

})