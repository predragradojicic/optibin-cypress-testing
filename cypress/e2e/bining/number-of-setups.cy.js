/// <reference types="cypress" />

import IncorrectValues from '../../support/page_objects/incorrect-values';
import CorrectValues from '../../support/page_objects/correct-values';
import SelectProducts from '../../support/page_objects/select-products';

describe('Testing Number of Setups on the Bining page.', () => {

     // Log in.
     beforeEach(() => {
          cy.loginToOptibin();
          cy.wait(1000);
          cy.visitBiningPage();
     
     })
          
     it('Testing Number of Setups on the Bining page.', () => {
          
          // Open Test P6 folder.
          SelectProducts.openFolder('Test P6');

          // Select Foo bining product.
          SelectProducts.openFolder('Foo');

          // Number of setups should have value 0.
          cy.get(':nth-child(3) > .app-input')
               .should('have.value', '0');

          // "Run" button should not be clickable.
          cy.get('.app-btn-secondary').should('be.disabled');

          // Check if border is red after typing an incorrect value.
          cy.get(':nth-child(3) > .app-input')
               .type('.');
          cy.get('.app-flex')
               .click();
          cy.get(':nth-child(3) > .app-input')
               .should('have.class', 'app-border-red');

          // "Run" button should not be clickable when border is red.
          cy.get('.app-btn-secondary').should('be.disabled');

          // Type different incorrect values. Border should be red.
          IncorrectValues.incorrectValues('incorrect-values.json', ':nth-child(3) > .app-input');

          // Type correct value and check if the input field has no red border and has that value.
          CorrectValues.correctValues(':nth-child(3) > .app-input');

     })

})