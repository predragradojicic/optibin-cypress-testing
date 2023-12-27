/// <reference types="cypress" />

import Manufacturers from '../../support/page_objects/manufacturers';

describe('Adding, editing and deleting manufacturers on Nome page.', () => {

     // Log in.
     beforeEach(() => {
          cy.loginToOptibin();
          cy.wait(1000);
   
     })

     // Date (miliseconds) to string. The string is unique. uniqueId() adds a number.
     const uniqueSeed = Date.now().toString();
     const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
     const uniqueId = getUniqueId();
       
     it('Adding a new manufacturer on Nome page.', () => {
          
        // Click on Add.
        Manufacturers.manufacturerButton('Add').click();

        // The window is open.
        Manufacturers.windowIsOpen('Add Manufacturer');
            
        // Close window.
        Manufacturers.closeWindow();

        // The window is closed.
        Manufacturers.windowClosed();

        // Click on Add.
        Manufacturers.manufacturerButton('Add').click();

        // Save button is disabled.
        Manufacturers.buttonDisabled('Save');

        // Type name.
        Manufacturers.typeName(uniqueId);

        // Save button is enabled. Click on Save.
        Manufacturers.clickOnButton('Save');

        // Confirm that the  manufacturer is added in menu.
        Manufacturers.manufacturerOrColor(uniqueId);

     });

     it('Edit manufacturer on Nome page.', () => {
          
        // Select a manufacturer.
        Manufacturers.manufacturerOrColor(uniqueId).click();

        // Click on Edit.
        Manufacturers.manufacturerButton('Edit').click();

        // The window is open.
        Manufacturers.windowIsOpen('Edit Manufacturer');
            
        // Close window.
        Manufacturers.closeWindow();

        // The window is closed.
        Manufacturers.windowClosed();

        // Manufacturer is present.
        Manufacturers.manufacturerOrColor(uniqueId);

        // Click on Edit.
        Manufacturers.manufacturerButton('Edit').click();

        // Edit name.
        Manufacturers.editManufacturer(uniqueId + ' edit');

        // Click on Save.
        Manufacturers.clickOnButton('Save');

        // Confirm that the  manufacturer is edited.
        Manufacturers.manufacturerOrColor(uniqueId + ' edit');

     });

     it('Delete manufacturer on Nome page.', () => {
          
        // Select a manufacturer.
        Manufacturers.manufacturerOrColor(uniqueId + ' edit').click();

        // Click on Delete.
        Manufacturers.manufacturerButton('Delete').click();

        // The window is open.
        Manufacturers.windowIsOpen('Are you sure');
            
        // Close window.
        Manufacturers.closeWindow();

        // The window is closed.
        Manufacturers.windowClosed();

        // Manufacturer is present.
        Manufacturers.manufacturerOrColor(uniqueId + ' edit');

        // Click on Delete.
        Manufacturers.manufacturerButton('Delete').click();

        // Click on No.
        Manufacturers.clickOnButton('No');

        // The window is closed.
        Manufacturers.windowClosed();

        // Manufacturer is present.
        Manufacturers.manufacturerOrColor(uniqueId + ' edit');

        // Click on Delete.
        Manufacturers.manufacturerButton('Delete').click();
        // Click on Yes.
        Manufacturers.clickOnButton('Yes');

        // Confirm that the  manufacturer is deleted.
        Manufacturers.manufacturerOrColor(uniqueId + ' edit').should('not.exist');

     });
})