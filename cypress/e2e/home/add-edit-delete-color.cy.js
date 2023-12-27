/// <reference types="cypress" />

import Manufacturers from '../../support/page_objects/manufacturers';

describe('Adding, editing and deleting colors on Nome page.', () => {

     // Log in.
     beforeEach(() => {
          cy.loginToOptibin();
          cy.wait(1000);
   
     })

     // Date (miliseconds) to string. The string is unique.
     const uniqueId = Date.now().toString() - 1600000000000;
       
     it('Adding a new color on Nome page.', () => {

      // Select a manufacturer.
      Manufacturers.manufacturerOrColor('Test P3').click();

      // Click on Add LED.
      Manufacturers.colorButton('Add LED').click();

      // The window is open.
      Manufacturers.windowIsOpen('Add LED');

      // Save button is disabled.
      Manufacturers.buttonDisabled('Save');

      // Close window.
      Manufacturers.closeWindow();

      // The window is closed.
      Manufacturers.windowClosed();

      // Fixture types.
      const types = ['Chromaticity', 'Wavelength'];

      // Channels.
      types.forEach((type, index) => {

         // Click on Add LED.
         Manufacturers.colorButton('Add LED').click();

            // Type name.
         Manufacturers.typeName('Color '+ index + ' ' + uniqueId);

            // Type Order Code.
         Manufacturers.typeOrderCode('Order Code ' + uniqueId);

         // Type 12NC.
         const nc12nc = uniqueId + index
         Manufacturers.type12NC(nc12nc);

         Manufacturers.selectColorType(type);

         // Save button is enabled. Click on Save.
         Manufacturers.clickOnButton('Save');

         cy.wait(1000);

         // Confirm that the color is added in menu.
         Manufacturers.manufacturerOrColor('Color '+ index + ' ' + uniqueId);

         // The color is open. Pass: name, 12NC and Order Code.
         Manufacturers.colorIsOpen('Color '+ index + ' ' + uniqueId, nc12nc, 'Order Code ' + uniqueId);

         cy.get('.app-data-view-title').should('contain', type)

      });

     });

     it('Edit color on Nome page.', () => {

      // Select a manufacturer.
      Manufacturers.manufacturerOrColor('Test P3').click();

      // Fixture types.
      const types = ['Wavelength', 'Chromaticity'];

      // Channels.
      types.forEach((type, index) => {

         const nc12nc = uniqueId + index
         const nc13nc = uniqueId + index + 5

         // Confirm that the color is added in menu.
         Manufacturers.manufacturerOrColor('Color '+ index + ' ' + uniqueId).click();

         // The color is open. Pass: name, 12NC and Order Code.
         Manufacturers.colorIsOpen('Color '+ index + ' ' + uniqueId, nc12nc, 'Order Code ' + uniqueId);

         // Click on Edit.
         Manufacturers.colorButton('Edit').click();

         // Type name.
         Manufacturers.typeName('Color '+ index + ' edit ' + uniqueId);

         // Type Order Code.
         Manufacturers.typeOrderCode('Order Code edit ' + uniqueId);

         // Type 12NC.
         Manufacturers.type12NC(nc13nc);

         Manufacturers.selectColorType(type);

         // Save button is enabled. Click on Save.
         Manufacturers.clickOnButton('Save');

         // Confirm that the color is added in menu.
         Manufacturers.manufacturerOrColor('Color '+ index + ' ' + uniqueId);

         // The color is open. Pass: name, 12NC and Order Code.
         Manufacturers.colorIsOpen('Color '+ index + ' edit ' + uniqueId, nc13nc, 'Order Code edit ' + uniqueId);

         cy.get('.app-data-view-title').should('contain', type)

      });

     });

     it('Delete color on Nome page.', () => {

      // Select a manufacturer.
      Manufacturers.manufacturerOrColor('Test P3').click();

      // Fixture types.
      const indexes = [0, 1];

      // Channels.
      indexes.forEach((index) => {

         // Select the color.
         Manufacturers.manufacturerOrColor('Color '+ index + ' edit ' + uniqueId).click();

         // Click on Edit.
         Manufacturers.colorButton('Delete').click();

         // The window is open.
         Manufacturers.windowIsOpen('Are you sure');
            
         // Close window.
         Manufacturers.closeWindow();

         // The window is closed.
         Manufacturers.windowClosed();

         // Color is present.
         Manufacturers.manufacturerOrColor('Color '+ index + ' edit ' + uniqueId);

         // The color is open. Pass: name, 12NC and Order Code.
         const nc13nc = uniqueId + index + 5
         Manufacturers.colorIsOpen('Color '+ index + ' edit ' + uniqueId, nc13nc, 'Order Code edit ' + uniqueId);

         // Click on Delete.
         Manufacturers.colorButton('Delete').click();

         // Click on No.
         Manufacturers.clickOnButton('No');

         // The window is closed.
         Manufacturers.windowClosed();

         // Color is present.
         Manufacturers.manufacturerOrColor('Color '+ index + ' edit ' + uniqueId);

         // The color is open. Pass: name, 12NC and Order Code.
         Manufacturers.colorIsOpen('Color '+ index + ' edit ' + uniqueId, nc13nc, 'Order Code edit ' + uniqueId);

         // Click on Delete.
         Manufacturers.colorButton('Delete').click();

         // Click on Yes.
         Manufacturers.clickOnButton('Yes');

         // Confirm that the color is removed menu.
         Manufacturers.manufacturerOrColor('Color '+ index + ' edit ' + uniqueId).should('not.exist');

         // The color is not open.
         Manufacturers.colorIsClosed('Color '+ index + ' edit ' + uniqueId);

      });

     });
})