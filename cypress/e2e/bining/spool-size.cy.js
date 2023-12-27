/// <reference types="cypress" />

import IncorrectValues from '../../support/page_objects/incorrect-values';
import CorrectValues from '../../support/page_objects/correct-values';
import SelectProducts from '../../support/page_objects/select-products';
import InputFields from '../../support/page_objects/input-fields';

describe('Testing Number of Setups on the Bining page.', () => {

     // Log in.
     beforeEach(() => {
          cy.loginToOptibin();
          cy.wait(1000);
          cy.visitBiningPage();
     
     })
          
     it('Testing Spool Size on the Bining page.', () => {
          
          // Open Test P6 folder.
          SelectProducts.productInMenu('Test P6');

          // Select Foo bining product.
          SelectProducts.productInMenu('Foo');

          // Spool Size should have value 0.
          InputFields.spoolSize().should('have.value', '0');

          // Type different incorrect values. Border should be red. Pass: JSON file from fixtures which contains incorrect values and the input field.
          IncorrectValues.incorrectValues('incorrect-values.json', ':nth-child(4) > .app-input');

          // Type correct value and check if the input field has no red border and if that value is displayed. Pass: the input field.
          CorrectValues.correctValues(':nth-child(4) > .app-input');

          InputFields.inputArrows(':nth-child(4) > .app-input');

     })

})