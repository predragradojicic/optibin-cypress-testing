/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';
import InventoryCount from '../../support/page_objects/inventory-count';

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

        InventoryCount.fillInventoryCount(55);

        cy.get('.app-flex > :nth-child(3) > .app-input').clear().type('3');
        cy.get('.app-flex > :nth-child(4) > .app-input').clear().type('30');
        cy.get('.app-btn-secondary').click();
        cy.wait(6000);

        cy.get('.app-btn-secondary').contains('Run').should('not.exist');
        cy.get('.app-btn-neutral').contains('Reset').should('not.exist');
        cy.get('.app-btn-neutral').contains('Upload').should('not.exist');
        cy.get('.app-btn-neutral').contains('Download').should('not.exist');

        cy.get('.app-btn-secondary').contains('Save').should('exist');
        cy.get('.app-btn-neutral').contains('Cancel').should('exist');
        cy.get('.app-btn-neutral').contains('Export').should('exist');

        /* ==== Generated with Cypress Studio ==== */
        cy.get('tbody > :nth-child(1) > :nth-child(1)').should('contain', 'Bin Code');
        cy.get('tbody > :nth-child(1)').find('td').parent('tr').should('contain', 'Recipe Flux');
        cy.get('tbody > :nth-child(1)').find('td').parent('tr').should('contain', 'Recipe Wavelength');
        
        cy.get(':nth-child(1) > .mt15').should('contain', 'Inventory Summary:');
        cy.get('.app-binning-results > :nth-child(1) > :nth-child(4) > :nth-child(1) > :nth-child(1)').should('contain', 'Bins');
        cy.get('.app-binning-results > :nth-child(1) > :nth-child(4) > :nth-child(2) > :nth-child(1)').should('contain', 'Starting');
        cy.get('.app-binning-results > :nth-child(1) > :nth-child(4) > :nth-child(3) > :nth-child(1)').should('contain', 'Used');
        cy.get('.app-binning-results > :nth-child(1) > :nth-child(4) > :nth-child(4) > :nth-child(1)').should('contain', 'Remained');
        cy.get('.app-binning-results > :nth-child(1) > :nth-child(4) > :nth-child(5) > :nth-child(1)').should('contain', '#LEDs Used');
        /* ==== End Cypress Studio ==== */
    })
})