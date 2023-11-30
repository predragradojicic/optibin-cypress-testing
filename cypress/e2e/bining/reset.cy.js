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

        cy.get(':nth-child(3) > .app-input')
            .type('{selectall}').type('5');

        cy.get(':nth-child(4) > .app-input')
        .type('{selectall}').type('5');

        cy.get('.app-products-header-title > :nth-child(4)').click();

        cy.get(':nth-child(3) > .app-input')
            .should('have.value', '0');

        cy.get(':nth-child(4) > .app-input')
            .should('have.value', '0');

        const values = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];

        values.forEach((value) => {

            // Find the input element using :nth-child(3) > .app-input
            cy.get('.app-products-channels-block-item')
                .contains(value)
                .click();

            cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input')
                .clear()
                .type('{selectall}').type('5');
            
            cy.get('.app-products-header-title > :nth-child(4)').click();

            cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input')
                .should('have.value', '0');
        });
        
    })
})