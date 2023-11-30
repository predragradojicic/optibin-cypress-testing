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

        cy.get('.app-btn-secondary').contains('Save').click();
        cy.wait(2000);
        cy.get('.app-btn-neutral').contains('Finish').click();
        cy.wait(2000);

        cy.get('.app-btn-secondary').contains('Run').should('be.disabled');
        cy.get('.app-btn-neutral').contains('Reset').should('exist');
        cy.get('.app-btn-neutral').contains('Upload').should('exist');
        cy.get('.app-btn-neutral').contains('Download').should('exist');

        cy.get('.app-products-header-title.app-bining-control').contains('Save').should('not.exist');
        cy.get('.app-products-header-title.app-bining-control').contains('Cancel').should('not.exist');
        cy.get('.app-products-header-title.app-bining-control').contains('Finish').should('not.exist');
        cy.get('.app-products-header-title.app-bining-control').contains('Export').should('not.exist');

        cy.get(':nth-child(3) > .app-input')
               .should('have.class', 'app-border-red');

        cy.get(':nth-child(4) > .app-input')
            .should('have.class', 'app-border-red');

        cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input').should('have.value', '0');
        cy.get('.app-products-channels-block-items > :nth-child(1)').click();
        cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input').should('have.value', '0');

    })
})