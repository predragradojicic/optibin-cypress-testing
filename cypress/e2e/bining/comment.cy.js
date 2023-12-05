/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';
import InputFields from '../../support/page_objects/input-fields';
import Button from '../../support/page_objects/buttons';

describe('Testing whether the comment is saved both on Bining and on Query page.', () => {

     // Log in.
     beforeEach(() => {
          cy.loginToOptibin();
          cy.wait(1000);
          cy.visitBiningPage();
   
     })
       
     it('Testing whether the comment is saved both on Bining and on Query page.', () => {

          // Open Test P6 folder.
          SelectProducts.openFolder('Test P6');

          // Sellect a bining product with two comments.
          SelectProducts.openFolder('Foo');

          // Fill Inventory Count fields on both channels.
          const channels = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];

          InputFields.fillInventoryCount(channels, 55);

          // Confirm that the comment input is empty.
          cy.get('input[placeholder*="Comment"]').should('have.value', '');

          // Enter a comment.
          cy.get('input[placeholder*="Comment"]').click().type('comment123');

          // Fill Number Of Setups and Spool Size, and then start a run.
          InputFields.numberOfSetups().clear().type('3');
          InputFields.spoolSize().clear().type('30');
          Button.Run().click();
          cy.wait(6000);

          // Check if comment is saved.
          cy.get('input[placeholder*="Comment"]').should('have.value', 'comment123');

          // Save and go to Bining page.
          Button.Save().click();
          cy.wait(2000);

          // Check if comment is saved.
          cy.get('input[placeholder*="Comment"]').should('have.value', 'comment123');

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

          // Check if comment is saved.
          cy.get('input[placeholder*="Comment"]').should('have.value', 'comment123');
     
     })
})