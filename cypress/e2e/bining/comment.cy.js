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

          // Sellect a bining product with no comments.
          SelectProducts.openFolder('Bar 2');

          // Confirm that the comment input is empty.
          cy.get('input[placeholder*="Comment"]').should('have.value', '');

          // Type 'comment123' on Foo.
          SelectProducts.openFolder('Foo');
          cy.get('input[placeholder*="Comment"]').click().type('comment123');

          // Run, go to Query page, find the last run and confirm that the comment is saved.
          

          // Confirm that the comment 'comment123' is displayed on Bar1.
          cy.get('input[placeholder*="Comment"]').should('have.value', 'comment123');
     
     })
})