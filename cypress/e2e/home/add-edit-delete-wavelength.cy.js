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

     const wavelengths =[{
      "name":"Wavelength 1",
      "min":"10",
      "max":"20",
      "unit": "nm"          
   },
   {
      "name":"Wavelength 2",
      "min":"22",
      "max":"32",
      "unit": "nm"
   }]

   const firstWavelengthName = wavelengths[0].name;
   const firstWavelengthMin = wavelengths[0].min;
   const firstWavelengthMax = wavelengths[0].max;
   const firstWavelengthUnit = wavelengths[0].unit;
   const secondWavelengthName = wavelengths[1].name;
   const secondWavelengthMin = wavelengths[1].min;
   const secondWavelengthMax = wavelengths[1].max;
       
   it('Flux input fields validation.', () => {
      // Select a manufacturer.
      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      Manufacturers.addWavelength();
      Manufacturers.wavelengthIsOpen();

      const inputs = ['Color Bin', 'Min', 'Max'];

      inputs.forEach(input => {
         Manufacturers.selectValue(input).should('have.class', 'app-border-red');

      })

      Manufacturers.selectValue('Unit').should('have.class', 'app-border-red');

      Products.buttonDisabled('Save', 'Save & Add');
      Manufacturers.errorMessage().should('contain', 'Min and Max must be positive numbers with max 2 decimals');

      inputs.forEach((input, index) => {
         
         Manufacturers.selectValue(input).clear().type('5');
         Manufacturers.selectValue(input).should('not.have.class', 'app-border-red');

         Products.buttonDisabled('Save', 'Save & Add');
         Manufacturers.errorMessage().should('contain', 'Min and Max must be positive numbers with max 2 decimals');

      });

      Manufacturers.selectUnit().select('nm');
      Manufacturers.selectUnit().should('not.have.class', 'app-border-red');
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

   it('Adding a new flux. Test "Save" button.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      Manufacturers.addWavelength();

      Manufacturers.colorBin().clear().type(firstWavelengthName + ' ' + uniqueId);
      Manufacturers.minValue().clear().type(firstWavelengthMin);
      Manufacturers.maxValue().clear().type(firstWavelengthMax);
      Manufacturers.selectUnit().select(firstWavelengthUnit);

      Products.clickOnButton('Save');
      cy.wait(1000);

      cy.get('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstWavelengthName + ' ' + uniqueId)
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstWavelengthMin + ' ' + firstWavelengthUnit)
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstWavelengthMax + ' ' + firstWavelengthUnit)
         .should('exist');

   });

   it('Adding a new flux. Test "Save & Add" button.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      Manufacturers.addWavelength();

      Manufacturers.colorBin().clear().type(secondWavelengthName + ' ' + uniqueId);
      Manufacturers.minValue().clear().type(secondWavelengthMin);
      Manufacturers.maxValue().clear().type(secondWavelengthMax);
      Manufacturers.selectUnit().select(firstWavelengthUnit);

      Products.clickOnButton('Save & Add');

      Manufacturers.colorBin().should('have.class', 'app-border-red').should('have.value', '');
      Manufacturers.minValue().should('have.class', 'app-border-red').should('have.value', '');
      Manufacturers.maxValue().should('have.class', 'app-border-red').should('have.value', '');
      Manufacturers.selectUnit().should('have.class', 'app-border-red');

      Products.closeWindow();

      cy.get('.app-data-view-row-hover')
         .contains('.app-data-view-col', secondWavelengthName + ' ' + uniqueId)
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', secondWavelengthMin + ' ' + firstWavelengthUnit)
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', secondWavelengthMax + ' ' + firstWavelengthUnit)
         .should('exist');

   });

   it('Edit flux.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();
      cy.wait(1000);

      Manufacturers.selectWavelength(firstWavelengthName + ' ' + uniqueId).click();
      Manufacturers.wavelengthIsOpen();

      Manufacturers.colorBin().then( wavelengthName => {
         cy.wrap(wavelengthName).should('not.have.class', 'app-border-red').and('have.value', firstWavelengthName + ' ' + uniqueId);
         cy.wrap(wavelengthName).clear().type(firstWavelengthName + ' ' + uniqueId + ' edit');
      });
      Manufacturers.minValue().then( wavelengthNameMin => {
         cy.wrap(wavelengthNameMin).should('not.have.class', 'app-border-red').and('have.value', firstWavelengthMin);
         cy.wrap(wavelengthNameMin).clear().type(firstWavelengthMin + 2);
      });
      Manufacturers.maxValue().then( wavelengthNameMax => {
         cy.wrap(wavelengthNameMax).should('not.have.class', 'app-border-red').and('have.value', firstWavelengthMax);
         cy.wrap(wavelengthNameMax).clear().type(firstWavelengthMax + 2);
      });

      Products.clickOnButton('Save');
      cy.wait(1000);
      Products.windowClosed();

      cy.get('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstWavelengthName + ' ' + uniqueId + ' edit')
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstWavelengthMin + 2 + ' ' + firstWavelengthUnit)
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstWavelengthMax + 2 + ' ' + firstWavelengthUnit)
         .should('exist');

   });

   it('Delete flux.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      Manufacturers.deleteWavelength(secondWavelengthName + ' ' + uniqueId);

      Products.windowIsOpen('Are you sure');
      Products.closeWindow();
      Products.windowClosed();

      Manufacturers.deleteWavelength(secondWavelengthName + ' ' + uniqueId);

      Products.windowIsOpen('Are you sure');
      Products.clickOnButton('No');
      Products.windowClosed();

      Manufacturers.deleteWavelength(secondWavelengthName + ' ' + uniqueId);

      Products.windowIsOpen('Are you sure');
      Products.clickOnButton('Yes');
      cy.wait(1000);
      Products.windowClosed();

      Manufacturers.selectWavelength(secondWavelengthName + ' ' + uniqueId).should('not.exist');

   });
})