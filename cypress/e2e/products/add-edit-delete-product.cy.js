/// <reference types="cypress" />

import Products from '../../support/page_objects/products';
import SelectProducts from '../../support/page_objects/select-products';

describe('Adding, editing and deleting products on Products page.', () => {

     // Log in.
     beforeEach(() => {
         cy.loginToOptibin();
         cy.wait(1000);
         cy.visitProductsPage();
   
     })

     // Date (miliseconds) to string. The string is unique.
     const uniqueId = Date.now().toString();

      it('Add a new folder. Save button is disabled while name is empty and Fixture Type is removed after selecting a folder', () => {
         // Click on Add.
         Products.productButton('Add').click();

         // Close window.
         Products.closeWindow();
         cy.wait(1000);

         // The window is closed.
         Products.windowClosed();

         // Click on Add.
         Products.productButton('Add').click();

         // The window is open.
         Products.windowIsOpen('Add Product');

         // Save button is disabled.
         Products.buttonDisabled('Save');

         // Type and Fixture Type are displayed.
         cy.get('.app-product-add').contains('Folder').should('exist');
         cy.get('.app-product-add').contains('Linear').should('exist');

         // Type name.
         Products.typeName('Folder 1 ' + uniqueId);

         // Save button is disabled.
         Products.buttonEnabled('Save');

         Products.typeDescription('Description 1 ' + uniqueId);

         Products.selectType('Folder')
         cy.get('.app-product-add').find('Linear').should('not.exist');

         // Save button is enabled. Click on Save.
         Products.clickOnButton('Save');
         cy.wait(1000);

         // Confirm that the  manufacturer is added in menu.
         Products.productInMenu('Folder 1 ' + uniqueId);

      });

      it('Add a new folder inside a folder.', () => {

         Products.productInMenu('Folder 1 ' + uniqueId).click();

         // Click on Add.
         Products.productButton('Add').click();

        // Type name.
        Products.typeName('Folder 2 ' + uniqueId);

        Products.typeDescription('Description 2 ' + uniqueId);

        Products.selectType('Folder')

        // Save button is enabled. Click on Save.
        Products.clickOnButton('Save');
        cy.wait(1000);

        // Confirm that the  manufacturer is added in menu.
        Products.productInMenu('Folder 2 ' + uniqueId);

      });

      it('Add a new fixture, both linear and cluster.', () => {

         // Fixture types.
         const fixtures = ['Linear', 'Cluster'];

         // Channels.
         fixtures.forEach((fixture, index) => {

            // Click on Add.
            Products.productButton('Add').click();

            // Type name.
            Products.typeName('Fixture ' + index + ' ' + uniqueId);

            Products.typeDescription('Description ' + index + ' ' + uniqueId);

            Products.selectType('Fixture');

            Products.selectFixtureType(fixture);

            // Save button is enabled. Click on Save.
            Products.clickOnButton('Save');
            cy.wait(1000);

            // Confirm that the  manufacturer is added in menu.
            Products.productInMenu('Fixture ' + index + ' ' + uniqueId);

        });

      });

      it('Add a new fixture inside a folder.', () => {

         Products.productInMenu('Folder 1 ' + uniqueId).click();

         // Click on Add.
         Products.productButton('Add').click();

         // Type name.
         Products.typeName('Fixture ' + uniqueId);

         Products.typeDescription('Description ' + uniqueId);

         Products.selectFixtureType('Linear');

         // Save button is enabled. Click on Save.
         Products.clickOnButton('Save');
         cy.wait(1000);

         // Confirm that the  manufacturer is added in menu.
         Products.productInMenu('Fixture ' + uniqueId);

      });

      it('Confirm folder description.', () => {

         Products.productInMenu('Folder 1 ' + uniqueId).click();

         Products.confirmDescription('Description 1 ' + uniqueId);

      });

      it('Confirm fixture type and description.', () => {

         // Products.productInMenu('Folder 1 ' + uniqueId).click();
         // Products.productInMenu('Fixture ' + uniqueId).click();

         // Products.confirmDescription('Linear');
         // Products.confirmDescription('Description ' + uniqueId);

         const types = ['Linear', 'Cluster'];

         // Channels.
         types.forEach((type, index) => {

            Products.productInMenu('Fixture ' + index + ' ' + uniqueId).click();
            Products.confirmDescription(type);
            Products.confirmDescription('Description ' + index + ' ' + uniqueId);

        });

      });

     it('Edit a folder.', () => {
          
        // Select a manufacturer.
        Products.productInMenu('Folder 1 ' + uniqueId).click();
        Products.productInMenu('Folder 2 ' + uniqueId).click();

        // Click on Edit.
        Products.productButton('Edit').click();

        // The window is open.
        Products.windowIsOpen('Edit Product');
            
        // Close window.
        Products.closeWindow();

        // The window is closed.
        Products.windowClosed();

        Products.productButton('Edit').click();

        // Type name.
        Products.typeName('Folder 2 edit ' + uniqueId);

        Products.typeDescription('Description 2 edit ' + uniqueId);

        // Save button is enabled. Click on Save.
        Products.clickOnButton('Save');
        cy.wait(1000);

        SelectProducts.folderIsOpenOnProductsPage('Folder 2 edit ' + uniqueId, 'No items')

        Products.confirmDescription('Description 2 edit ' + uniqueId);

     });

     it('Edit a fixture, both linear and cluster.', () => {

      // Fixture types.
      const types = ['Cluster', 'Linear'];

      // Channels.
      types.forEach((type, index) => {

         SelectProducts.productInBreadcrumbMenu('Product');

         // Manufacturer is present.
         Products.productInMenu('Fixture ' + index + ' ' + uniqueId).click();

         // Click on Edit.
         Products.productButton('Edit').click();

         // The window is open.
         Products.windowIsOpen('Edit Product');
            
         // Close window.
         Products.closeWindow();

         // The window is closed.
         Products.windowClosed();

         Products.productButton('Edit').click();

         // Type name.
         Products.typeName('Fixture edit ' + index + ' ' + uniqueId);

         Products.typeDescription('Description edit ' + index + ' ' + uniqueId);

         Products.selectFixtureType(type);

         // Save button is enabled. Click on Save.
         Products.clickOnButton('Save');
         cy.wait(2000);

         // The window is closed.
         Products.windowClosed();
         cy.wait(2000);

         SelectProducts.fixtureIsOpen('Fixture edit ' + index + ' ' + uniqueId, 'No Selected Channel');

         Products.confirmDescription('Description edit ' + index + ' ' + uniqueId);

         Products.confirmDescription(type);

      });

   });

   it('Delete a folder.', () => {

      // Click on Add.
      Products.productButton('Add').click();

      // Type name.
      Products.typeName('Folder 3 ' + uniqueId);

      Products.selectType('Folder')

      // Save button is enabled. Click on Save.
      Products.clickOnButton('Save');
      cy.wait(1000);

      Products.productInMenu('Folder 3 ' + uniqueId).click();

      // Click on Edit.
      Products.productButton('Delete').click();

      // The window is open.
      Products.windowIsOpen('Are you sure');
          
      // Close window.
      Products.closeWindow();

      // The window is closed.
      Products.windowClosed();

      // Product is present.
      SelectProducts.folderIsOpenOnProductsPage('Folder 3 ' + uniqueId, 'No items');

      // Click on Edit.
      Products.productButton('Delete').click();

      Products.clickOnButton('No');

      // The window is closed.
      Products.windowClosed();

      SelectProducts.folderIsOpenOnProductsPage('Folder 3 ' + uniqueId, 'No items');

      // Click on Edit.
      Products.productButton('Delete').click();

      Products.clickOnButton('Yes');

      // The window is closed.
      Products.windowClosed();

      cy.get('.app-nav-map-item')
         .should('not.contain', 'Folder 3 ' + uniqueId)

   });

   it('Delete a fixture.', () => {

      Products.productInMenu('Fixture edit 1 ' + uniqueId).click();

      // Click on Edit.
      Products.productButton('Delete').click();

      // The window is open.
      Products.windowIsOpen('Are you sure');
          
      // Close window.
      Products.closeWindow();

      // The window is closed.
      Products.windowClosed();

      // Click on Edit.
      Products.productButton('Delete').click();

      Products.clickOnButton('No');

      // The window is closed.
      Products.windowClosed();

      // Click on Edit.
      Products.productButton('Delete').click();

      Products.clickOnButton('Yes');

      // The window is closed.
      Products.windowClosed();

      cy.get('.app-nav-map-item')
         .should('not.contain', 'Fixture edit 1 ' + uniqueId)

   });

   it('Delete a folder which contains a folder and a fixture.', () => {

      // Select a manufacturer.
      Products.productInMenu('Folder 1 ' + uniqueId).click();

      // Click on Edit.
      Products.productButton('Delete').click();

      // The window is open.
      Products.windowIsOpen('Are you sure');
          
      // Close window.
      Products.closeWindow();

      // The window is closed.
      Products.windowClosed();

      // Product is present.
      SelectProducts.folderIsOpenOnProductsPage('Folder 1 ' + uniqueId, 'Fixture ' + uniqueId, 'Fixture ' + uniqueId, 'Folder 2 edit ' + uniqueId);

      // Click on Edit.
      Products.productButton('Delete').click();

      Products.clickOnButton('No');

      // The window is closed.
      Products.windowClosed();

      SelectProducts.folderIsOpenOnProductsPage('Folder 1 ' + uniqueId, 'Fixture ' + uniqueId, 'Fixture ' + uniqueId, 'Folder 2 edit ' + uniqueId);

      // Click on Edit.
      Products.productButton('Delete').click();

      Products.clickOnButton('Yes');

      // The window is closed.
      Products.windowClosed();

      cy.get('.app-nav-map-item')
         .should('not.contain', 'Folder 1 ' + uniqueId)

   });
})