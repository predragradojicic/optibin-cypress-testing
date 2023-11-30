/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';

describe('Testing PCA Number on the Bining page.', () => {

     // Log in.
     beforeEach(() => {
          cy.loginToOptibin();
          cy.wait(1000);
          cy.visitBiningPage();
   
     })

       
     it('Testing PCA Number on the Bining page.', () => {

          // Open Test P6 folder.
          SelectProducts.openFolder('Test P6');

          // Check the PCA number for bining product Foo.
          cy.get('.app-nav-map-items > :nth-child(4)')
               .click();
          cy.get('select')
               .should('contain', 'PCA-322113-33');

          // Select a PCA number for bining product Bar 2.
          cy.get('.app-nav-map-items > :nth-child(3)')
               .click();
          cy.get(':nth-child(2) > .app-input')
               .select('2083').
               should('contain', 'PCA-322114-14');
     
     })
})