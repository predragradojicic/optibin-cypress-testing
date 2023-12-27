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

     const fluxes =[{
      "name":"Flux 1",
      "min":"10",
      "max":"20",
      "unit": "Lm"          
   },
   {
      "name":"Flux 2",
      "min":"22",
      "max":"32",
      "unit": "mW"
   }]

   const firstFluxName = fluxes[0].name;
   const firstFluxMin = fluxes[0].min;
   const firstFluxMax = fluxes[0].max;
   const firstFluxUnit = fluxes[0].unit;
   const secondFluxName = fluxes[1].name;
   const secondFluxUnit = fluxes[1].unit;
       
   it('Flux input fields validation.', () => {
      // Select a manufacturer.
      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      Manufacturers.addFlux();
      Manufacturers.fluxIsOpen();

      const inputs = ['Flux Bin', 'Min', 'Max'];

      inputs.forEach(input => {
         Manufacturers.selectValue(input).should('have.class', 'app-border-red');

      })

      Manufacturers.selectValue('Unit').should('have.class', 'app-border-red');

      Products.buttonDisabled('Save', 'Save & Add');
      Manufacturers.errorMessage().should('contain', 'Min and Max must be positive numbers with max 2 decimals');

      inputs.forEach((input) => {
         
         Manufacturers.selectValue(input).clear().type('5');
         Manufacturers.selectValue(input).should('not.have.class', 'app-border-red');

         Products.buttonDisabled('Save', 'Save & Add');
         Manufacturers.errorMessage().should('contain', 'Min and Max must be positive numbers with max 2 decimals');

      });

      Manufacturers.selectUnit().select('Lm');
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

   it('Adding a new flux. Test both units add test "Save" button.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      fluxes.forEach((flux) => {

         Manufacturers.addFlux();

         Manufacturers.fluxBin().clear().type(flux.name + ' 1 ' + uniqueId);
         Manufacturers.minValue().clear().type(flux.min);
         Manufacturers.maxValue().clear().type(flux.max);
         Manufacturers.selectUnit().select(flux.unit);

         Products.clickOnButton('Save');
         cy.wait(1000);

         cy.get('.app-data-view-row-hover')
            .contains('.app-data-view-col', flux.name + ' 1 ' + uniqueId)
            .parent('.app-data-view-row-hover')
            .contains('.app-data-view-col', flux.min + ' ' + flux.unit)
            .parent('.app-data-view-row-hover')
            .contains('.app-data-view-col', flux.max + ' ' + flux.unit)
            .should('exist');

      });

   });

   it('Adding a new flux. Test both units add test "Save & Add" button.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      fluxes.forEach((flux) => {

         Manufacturers.addFlux();

         Manufacturers.fluxBin().clear().type(flux.name + ' 2 ' + uniqueId);
         Manufacturers.minValue().clear().type(flux.min);
         Manufacturers.maxValue().clear().type(flux.max);
         Manufacturers.selectUnit().select(flux.unit);

         Products.clickOnButton('Save & Add');

         Manufacturers.fluxBin().should('have.class', 'app-border-red').should('have.value', '');
         Manufacturers.minValue().should('have.class', 'app-border-red').should('have.value', '');
         Manufacturers.maxValue().should('have.class', 'app-border-red').should('have.value', '');
         Manufacturers.selectUnit().should('have.class', 'app-border-red');

         Products.closeWindow();

         cy.get('.app-data-view-row-hover')
            .contains('.app-data-view-col', flux.name + ' 2 ' + uniqueId)
            .parent('.app-data-view-row-hover')
            .contains('.app-data-view-col', flux.min + ' ' + flux.unit)
            .parent('.app-data-view-row-hover')
            .contains('.app-data-view-col', flux.max + ' ' + flux.unit)
            .should('exist');

      });

   });

   it('Edit flux.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();
      cy.wait(1000);

      Manufacturers.selectFlux(firstFluxName + ' 1 ' + uniqueId).click();
      Manufacturers.fluxIsOpen();

      Manufacturers.fluxBin().then( fluxName => {
         cy.wrap(fluxName).should('not.have.class', 'app-border-red').and('have.value', firstFluxName + ' 1 ' + uniqueId);
         cy.wrap(fluxName).clear().type(firstFluxName + ' 1 ' + uniqueId + ' edit');
      });
      Manufacturers.minValue().then( fluxMin => {
         cy.wrap(fluxMin).should('not.have.class', 'app-border-red').and('have.value', firstFluxMin);
         cy.wrap(fluxMin).clear().type(firstFluxMin + 2);
      });
      Manufacturers.maxValue().then( fluxMax => {
         cy.wrap(fluxMax).should('not.have.class', 'app-border-red').and('have.value', firstFluxMax);
         cy.wrap(fluxMax).clear().type(firstFluxMax + 2);
      });
      Manufacturers.selectUnit().then( fluxUnit => {
         cy.wrap(fluxUnit).should('not.have.class', 'app-border-red').and('have.value', firstFluxUnit);
         cy.wrap(fluxUnit).select(secondFluxUnit);
      });

      Products.clickOnButton('Save');
      cy.wait(1000);
      Products.windowClosed();

      cy.get('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstFluxName + ' 1 ' + uniqueId + ' edit')
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstFluxMax + 2 + ' ' + secondFluxUnit)
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstFluxMax + 2 + ' ' + secondFluxUnit)
         .should('exist');

      Manufacturers.selectFlux(firstFluxName + ' 1 ' + uniqueId + ' edit').click();

      Manufacturers.selectUnit().select(firstFluxUnit);

      Products.clickOnButton('Save');

      cy.get('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstFluxName + ' 1 ' + uniqueId + ' edit')
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstFluxMax + 2 + ' ' + firstFluxUnit)
         .parent('.app-data-view-row-hover')
         .contains('.app-data-view-col', firstFluxMax + 2 + ' ' + firstFluxUnit)
         .should('exist');

   });

   it('Delete flux.', () => {

      Manufacturers.manufacturerOrColor('Test P3').click();
      Manufacturers.manufacturerOrColor('Color wav').click();

      cy.wait(1000);

      Manufacturers.deleteFlux(secondFluxName + ' 2 ' + uniqueId);

      Products.windowIsOpen('Are you sure');
      Products.closeWindow();
      Products.windowClosed();

      Manufacturers.deleteFlux(secondFluxName + ' 2 ' + uniqueId);

      Products.windowIsOpen('Are you sure');
      Products.clickOnButton('No');
      Products.windowClosed();

      Manufacturers.deleteFlux(secondFluxName + ' 2 ' + uniqueId);

      Products.windowIsOpen('Are you sure');
      Products.clickOnButton('Yes');
      cy.wait(1000);
      Products.windowClosed();

      Manufacturers.selectFlux(secondFluxName + ' 2 ' + uniqueId).should('not.exist');

   });
})