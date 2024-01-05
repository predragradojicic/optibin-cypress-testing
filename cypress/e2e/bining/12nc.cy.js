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
          SelectProducts.productInMenu('Test P6');

          // Check the only PCA number for bining product Foo.
          SelectProducts.productInMenu('Foo');
          cy.get('select').select('2081').should('contain', 'PCA-322113-33');

          cy.get('.app-bining-control.mr15').find('.app-text-gray').should('contain', '3221138');

          // Select the second PCA number for bining product Bar 2.
          SelectProducts.productInMenu('Bar 2');
          cy.get(':nth-child(2) > .app-input')
               .select('2082')
               .should('contain', 'PCA-322114-14');
          
          cy.get('.app-bining-control').find('.app-text-gray').then(($el) => {
               if ($el.text() === '3221149') {
                    cy.wrap($el).should('contain', '3221149');
               } else {
                    cy.wrap($el).should('be.empty');
                    }
               });
             
          // Select the first PCA number for bining product Bar 2.
          cy.get(':nth-child(2) > .app-input').select('2083').should('contain', 'PCA-322115-15');

          cy.get('.app-bining-control').find('.app-text-gray').then(($el) => {
               if ($el.text() === '3221157') {
                    cy.wrap($el).should('contain', '3221157');
               } else {
                    cy.wrap($el).should('be.empty');
               }
               });

     })
})