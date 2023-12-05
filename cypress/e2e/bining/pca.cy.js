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

          // Check the only PCA number for bining product Foo.
          SelectProducts.openFolder('Foo');
          cy.get('select')
               .select('2081')
               .should('contain', 'PCA-322113-33');

          // Select the second PCA number for bining product Bar 2.
          SelectProducts.openFolder('Bar 2');
          cy.get(':nth-child(2) > .app-input')
               .select('2083')
               .should('contain', 'PCA-322114-14');

          // Select the first PCA number for bining product Bar 2.
          cy.get(':nth-child(2) > .app-input')
               .select('2082')
               .should('contain', 'PCA-322114-14');
     
     })
})