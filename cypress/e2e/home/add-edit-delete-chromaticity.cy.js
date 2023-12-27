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

     const coordinates = ['x1', 'y1', 'x2', 'y2', 'x3', 'y3', 'x4', 'y4'];

     const chromaticity =[{
      "name":"Chromaticity 1",
      "type":"rectangle",
      "x1":"0.11",
      "y1":"0.11",
      "x2":"0.81",
      "y2":"0.11",
      "x3":"0.81",
      "y3":"0.81",
      "x4":"0.11",
      "y4":"0.81"
   },
   {
      "name":"Chromaticity 2",
      "type":"rectangle",
      "x1":"0.22",
      "y1":"0.22",
      "x2":"0.72",
      "y2":"0.22",
      "x3":"0.72",
      "y3":"0.72",
      "x4":"0.22",
      "y4":"0.72"
   }]

       
   it.only('Flux input fields validation.', () => {
      // Select a manufacturer.
      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color chr').click();

      cy.wait(1000);

      Manufacturers.addChromaticity();
      Manufacturers.chromaticityIsOpen();

      Manufacturers.chromaticityName().should('have.class', 'app-border-red');
      Manufacturers.chromaticityType().should('have.value', 'rectangle');

      coordinates.forEach((coordinate) => {

         Manufacturers.chromaticityCoordinate(coordinate).should('have.value', '0');

      });

      Products.buttonDisabled('Save', 'Save & Add');

      Manufacturers.chromaticityName().clear().type('Chromaticity 1');
      Manufacturers.chromaticityName().should('not.have.class', 'app-border-red');
      Products.buttonEnabled('Save', 'Save & Add');

      coordinates.forEach((coordinate) => {

         IncorrectValues.incorrectChromaticity('incorrect-chromaticity.json', coordinate, 'Save', 'Save & Add');
         Manufacturers.chromaticityCoordinate(coordinate).clear().type('0.1');
         Manufacturers.chromaticityCoordinate(coordinate).should('not.have.class', 'app-border-red');
         Products.buttonEnabled('Save', 'Save & Add');
         Manufacturers.chromaticityCoordinate(coordinate).clear().type('0.12');
         Manufacturers.chromaticityCoordinate(coordinate).should('not.have.class', 'app-border-red').and('have.value', '0.12');
         Products.buttonEnabled('Save', 'Save & Add');
         Manufacturers.chromaticityCoordinate(coordinate).type('3');
         Manufacturers.chromaticityCoordinate(coordinate).should('not.have.class', 'app-border-red').and('have.value', '0.123');
         Products.buttonEnabled('Save', 'Save & Add');
         Manufacturers.chromaticityCoordinate(coordinate).type('4');
         Manufacturers.chromaticityCoordinate(coordinate).should('not.have.class', 'app-border-red').and('have.value', '0.1234');
         Products.buttonEnabled('Save', 'Save & Add');
         
         Manufacturers.chromaticityCoordinate(coordinate).type('5');
         Manufacturers.chromaticityCoordinate(coordinate).should('have.class', 'app-border-red').and('have.value', '0.12345');
         Products.buttonDisabled('Save', 'Save & Add');
         Manufacturers.errorMessage().should('contain', 'Chromaticity must be a number between 0 and 1, max number of decimals is 4!');
         Manufacturers.chromaticityCoordinate(coordinate).type('6');
         Manufacturers.chromaticityCoordinate(coordinate).should('have.class', 'app-border-red').and('have.value', '0.123456');
         Products.buttonDisabled('Save', 'Save & Add');
         Manufacturers.errorMessage().should('contain', 'Chromaticity must be a number between 0 and 1, max number of decimals is 4!');

         Manufacturers.chromaticityCoordinate(coordinate).type('{backspace}');
         Manufacturers.chromaticityCoordinate(coordinate).should('have.class', 'app-border-red').and('have.value', '0.12345');
         Products.buttonDisabled('Save', 'Save & Add');
         Manufacturers.errorMessage().should('contain', 'Chromaticity must be a number between 0 and 1, max number of decimals is 4!');

         Manufacturers.chromaticityCoordinate(coordinate).type('{backspace}');
         Manufacturers.chromaticityCoordinate(coordinate).should('not.have.class', 'not.app-border-red').and('have.value', '0.1234');
         Products.buttonEnabled('Save', 'Save & Add');
         Manufacturers.errorMessage().should('not.exist');

      });

      Products.closeWindow();
      Products.windowClosed();

   });

   it('Adding a new flux. Test "Save" button.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      Manufacturers.addChromaticity();

      coordinates.forEach((coordinate) => {

         Manufacturers.chromaticityCoordinate(coordinate).clear().type('0.1');

      });

      Products.clickOnButton('Save');
      cy.wait(1000);

      // wavelengths.forEach((wavelength) => {

         // Manufacturers.addWavelength();

         // Manufacturers.colorBin().clear().type(firstWavelengthName + ' ' + uniqueId);
         // Manufacturers.minValue().clear().type(firstWavelengthMin);
         // Manufacturers.maxValue().clear().type(firstWavelengthMax);
         // Manufacturers.selectUnit().select(firstWavelengthUnit);

         // Products.clickOnButton('Save');
         // cy.wait(1000);

         // const inputFields = [firstWavelengthMin + ' ' + firstWavelengthUnit, firstWavelengthMax + ' ' + firstWavelengthUnit];

         // inputFields.forEach((input) => {

            cy.get('.app-data-view-row.app-data-view-row-hover')
               .contains('.app-data-view-col', firstWavelengthName + ' ' + uniqueId)
               .parent('.app-data-view-row-hover')
               .contains('.app-data-view-col', firstWavelengthMin + ' ' + firstWavelengthUnit)
               .parent('.app-data-view-row-hover')
               .contains('.app-data-view-col', firstWavelengthMax + ' ' + firstWavelengthUnit)
               .should('exist');


         // });

      // });

   });

   it('Adding a new flux. Test "Save & Add" button.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      // fluxes.forEach((flux) => {

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

         // const inputFields = [flux.min + ' ' + flux.unit, flux.max + ' ' + flux.unit];

         // inputFields.forEach((input) => {

            cy.get('.app-data-view-row-hover')
               .contains('.app-data-view-col', secondWavelengthName + ' ' + uniqueId)
               .parent('.app-data-view-row-hover')
               .contains('.app-data-view-col', secondWavelengthMin + ' ' + firstWavelengthUnit)
               .parent('.app-data-view-row-hover')
               .contains('.app-data-view-col', secondWavelengthMax + ' ' + firstWavelengthUnit)
               .should('exist');

         // });

      // });

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