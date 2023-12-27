/// <reference types="cypress" />

import Manufacturers from '../../support/page_objects/manufacturers';
import Products from '../../support/page_objects/products';
import IncorrectValues from '../../support/page_objects/incorrect-values';

describe('Adding, editing and deleting colors on Nome page.', () => {

   // Log in.
   beforeEach(() => {
         cy.loginToOptibin();
         cy.wait(1000);

   })

   // Date (miliseconds) to string. The string is unique.
   const uniqueId = Date.now().toString() - 1600000000000;

   const forvard_voltage =[{
      "name":"Voltage 1",
      "min":"10",
      "max":"20",
      "unit": "Lm"          
   },
   {
      "name":"Voltage 2",
      "min":"22",
      "max":"32",
      "unit": "mW"
   }]

   const firstForvardVoltageName = forvard_voltage[0].name;
   const firstForvardVoltageMin = forvard_voltage[0].min;
   const firstForvardVoltageMax = forvard_voltage[0].max;
   const secondForvardVoltageName = forvard_voltage[1].name;
   const secondForvardVoltageMin = forvard_voltage[1].min;
   const secondForvardVoltageMax = forvard_voltage[1].max;
       
   it.only('Forvard voltage input fields validation.', () => {
      // Select a manufacturer.
      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      Manufacturers.addForvardVoltage();
      Manufacturers.forvardVoltageIsOpen();

      const inputs = ['ID', 'Min', 'Max'];

      inputs.forEach(input => {
         Manufacturers.selectValue(input).should('have.class', 'app-border-red');

      })

      Products.buttonDisabled('Save', 'Save & Add');
      Manufacturers.errorMessage().should('contain', 'Min and Max must be positive numbers with max 2 decimals');

      inputs.forEach((input, index) => {
         
         Manufacturers.selectValue(input).clear().type('5');
         Manufacturers.selectValue(input).should('not.have.class', 'app-border-red');
         if (index < 2){
            Products.buttonDisabled('Save', 'Save & Add');
            Manufacturers.errorMessage().should('contain', 'Min and Max must be positive numbers with max 2 decimals');
         }

      });

      Products.buttonEnabled('Save', 'Save & Add');
      Manufacturers.errorMessage().should('not.exist');

      const values = ['Min', 'Max'];

      values.forEach((value) => {

         IncorrectValues.incorrectChromaticity('incorrect-flux-voltage-wavelength-chromaticity.json', value, 'Save', 'Save & Add');

         Manufacturers.selectValue(value).clear().type('10.1');
         Manufacturers.selectValue(value).should('not.have.class', 'app-border-red').and('have.value', '10.1');
         Products.buttonEnabled('Save', 'Save & Add');
         Manufacturers.selectValue(value).type('2');
         Manufacturers.selectValue(value).should('not.have.class', 'app-border-red').and('have.value', '10.12');
         Products.buttonEnabled('Save', 'Save & Add');
         Manufacturers.selectValue(value).type('3');
         Manufacturers.selectValue(value).should('have.class', 'app-border-red').and('have.value', '10.123');
         Products.buttonDisabled('Save', 'Save & Add');
         Manufacturers.errorMessage().should('contain', 'Min and Max must be positive numbers with max 2 decimals');

         Manufacturers.selectValue(value).type('4');
         Manufacturers.selectValue(value).should('have.class', 'app-border-red').and('have.value', '10.1234');
         Products.buttonDisabled('Save', 'Save & Add');
         Manufacturers.errorMessage().should('contain', 'Min and Max must be positive numbers with max 2 decimals');

         Manufacturers.selectValue(value).type('{backspace}');
         Manufacturers.selectValue(value).should('not.have.class', 'not.app-border-red').and('have.value', '10.123');
         Products.buttonDisabled('Save', 'Save & Add');
         Manufacturers.errorMessage().should('contain', 'Min and Max must be positive numbers with max 2 decimals');

         Manufacturers.selectValue(value).type('{backspace}');
         Manufacturers.selectValue(value).should('not.have.class', 'not.app-border-red').and('have.value', '10.12');
         Products.buttonEnabled('Save', 'Save & Add');
         Manufacturers.errorMessage().should('not.exist');

      })

      Products.closeWindow();
      Products.windowClosed();

   });

   it('Adding a new forvard voltage. Test "Save" button.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      Manufacturers.addForvardVoltage();

      Manufacturers.forvardVoltageId().clear().type(firstForvardVoltageName + ' ' + uniqueId);
      Manufacturers.minValue().clear().type(firstForvardVoltageMin);
      Manufacturers.maxValue().clear().type(firstForvardVoltageMax);

      Products.clickOnButton('Save');
      cy.wait(1000);

      cy.get('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstForvardVoltageName + ' ' + uniqueId)
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstForvardVoltageMin)
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstForvardVoltageMax)
         .should('exist');

   });

   it('Adding a new forvard voltage. Test "Save & Add" button.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      Manufacturers.addForvardVoltage();

      Manufacturers.forvardVoltageId().clear().type(secondForvardVoltageName + ' ' + uniqueId);
      Manufacturers.minValue().clear().type(secondForvardVoltageMin);
      Manufacturers.maxValue().clear().type(secondForvardVoltageMax);

      Products.clickOnButton('Save & Add');

      Manufacturers.forvardVoltageId().should('have.class', 'app-border-red').should('have.value', '');
      Manufacturers.minValue().should('have.class', 'app-border-red').should('have.value', '');
      Manufacturers.maxValue().should('have.class', 'app-border-red').should('have.value', '');

      Products.closeWindow();

      cy.get('.app-data-view-row-hover')
         .contains('.app-data-view-col', secondForvardVoltageName + ' ' + uniqueId)
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', secondForvardVoltageMin)
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', secondForvardVoltageMax)
         .should('exist');

   });

   it('Edit forvard voltage.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();
      cy.wait(1000);

      Manufacturers.selectForvardVoltage(firstForvardVoltageName + ' ' + uniqueId).click();
      Manufacturers.forvardVoltageIsOpen();

      Manufacturers.forvardVoltageId().then( voltageName => {
         cy.wrap(voltageName).should('not.have.class', 'app-border-red').and('have.value', firstForvardVoltageName + ' ' + uniqueId);
         cy.wrap(voltageName).clear().type(firstForvardVoltageName + ' ' + uniqueId + ' edit');
      });
      Manufacturers.minValue().then( voltageMin => {
         cy.wrap(voltageMin).should('not.have.class', 'app-border-red').and('have.value', firstForvardVoltageMin);
         cy.wrap(voltageMin).clear().type(firstForvardVoltageMin + 2);
      });
      Manufacturers.maxValue().then( voltageMax => {
         cy.wrap(voltageMax).should('not.have.class', 'app-border-red').and('have.value', firstForvardVoltageMax);
         cy.wrap(voltageMax).clear().type(firstForvardVoltageMax + 2);
      });

      Products.clickOnButton('Save');
      cy.wait(1000);
      Products.windowClosed();

      cy.get('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstForvardVoltageName + ' ' + uniqueId + ' edit')
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstForvardVoltageMax + 2)
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstForvardVoltageMax + 2)
         .should('exist');

   });

   it('Delete forvard voltage.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      Manufacturers.deleteForvardVoltage(secondForvardVoltageName + ' ' + uniqueId);

      Products.windowIsOpen('Are you sure');
      Products.closeWindow();
      Products.windowClosed();

      Manufacturers.deleteForvardVoltage(secondForvardVoltageName + ' ' + uniqueId);

      Products.windowIsOpen('Are you sure');
      Products.clickOnButton('No');
      Products.windowClosed();

      Manufacturers.deleteForvardVoltage(secondForvardVoltageName + ' ' + uniqueId);

      Products.windowIsOpen('Are you sure');
      Products.clickOnButton('Yes');
      cy.wait(1000);
      Products.windowClosed();

      Manufacturers.selectForvardVoltage(secondForvardVoltageName + ' ' + uniqueId).should('not.exist');

   });
})