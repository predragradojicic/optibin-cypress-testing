/// <reference types="cypress" />

import IncorrectValues from '../../support/page_objects/incorrect-values';

describe('Testing Number of Setups on the Bining page.', () => {

    // Log in.
    beforeEach(() => {
       cy.loginToOptibin();
       cy.wait(1000);
   
   })

       
   it('Testing Number of Setups on the Bining page.', () => {
       // Open Bining page.
       cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(4) > .noactive').click();

       // Open Test P6 folder.
       cy.get('.app-nav-map-items')
           .find('.app-nav-map-item')
           .contains('Test P6')
           .click();

       // Select Foo bining product.
       cy.get('.app-nav-map-items > :nth-child(4)')
            .click();

       // Number of setups should have value 0.
       cy.get(':nth-child(3) > .app-input')
            .should('have.value', '0');

       // "Run" button should not be clickable.
       cy.get('.app-btn-secondary').should('be.disabled');

       IncorrectValues.incorrectValues();

       // Type incorrect value and check if the input field has red border.
     //   cy.fixture('incorrect-values.json').then((data) => {
     //      // Iterate over the values in the JSON file
     //      data.values.forEach((value, index) => {
     //           // Find the input element using :nth-child(3) > .app-input
     //           cy.get(':nth-child(3) > .app-input').type(value);

     //           cy.get('.app-flex')
     //           .click();
     //           cy.get(':nth-child(3) > .app-input')
     //                .should('have.class', 'app-border-red');

     //           // "Run" button should not be clickable.
     //           cy.get('.app-btn-secondary').should('be.disabled');

     //      });
     //      });

       // Type correct value and check if the input field has no red border and has that value.
       cy.get(':nth-child(3) > .app-input')
            .clear();
       cy.get(':nth-child(3) > .app-input')
            .type('6');
       cy.get('.app-flex')
            .click();
       cy.get(':nth-child(3) > .app-input')
          .should('have.value', '6')
          .should('have.class', 'app-input');

   })

})