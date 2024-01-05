/// <reference types="cypress" />

import Manufacturers from '../../support/page_objects/manufacturers';

describe('Clone colors on Nome page.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);

    })

    it('Clone one chromaticity and one wavelength color into the the same manufacturer and into the the other manufacturer.', () => {

        // Channels
        const channels = ['Color chr', 'Color wav'];

        // In the first iteration chromaticity and wavelength channels are cloned into the same manufacturer.
        // In the second iteration the channels are cloned into the other manufacturre.
        for (let i = 1; i <= 2; i++) {

            // Channels.
            channels.forEach((channel) => {

                // Select a manufacturer.
                Manufacturers.manufacturerOrColor('Test P3').click();

                // Date (miliseconds) to string. The string is unique.
                const uniqueId = Date.now().toString() - 1600000000000;

                // Select the color.
                Manufacturers.manufacturerOrColor(channel).click();

                // Click on Edit.
                Manufacturers.colorButton('Clone').click();

                // The window is open.
                Manufacturers.windowIsOpen('Clone LED');

                // Close window.
                Manufacturers.closeWindow();

                // The window is closed.
                Manufacturers.windowClosed();

                // Click on Add LED.
                Manufacturers.colorButton('Clone').click();

                // Save button is disabled.
                Manufacturers.buttonDisabled('Save');

                // Check the default name.
                cy.get('input[placeholder*="Name"]').should('have.value', channel + ' (Clone)');

                // Type name.
                Manufacturers.typeName(channel + ' ' + uniqueId);

                // Check if Order Code is empty and if it has red bordre.
                cy.get('input[placeholder*="Order Code"]').should('have.value', '').and('have.class', 'app-border-red');

                // Check if 12NC is empty and if it has red bordre.
                cy.get('input[placeholder*="12NC"]').should('have.value', '').and('have.class', 'app-border-red');

                // Type Order Code.
                Manufacturers.typeOrderCode('Order Code 1' + uniqueId);

                // Type 12NC.
                Manufacturers.type12NC(uniqueId);

                if (i === 2) {               
                    // Select another manufacturer.
                    cy.get('select.app-input').select('99').contains('Test P4');

                }

                // Save button is enabled. Click on Save.
                Manufacturers.clickOnButton('Save');
                cy.wait(1000);

                if (i === 2) {
                    // Select a manufacturer.
                    Manufacturers.manufacturerOrColor('Test P4').click();

                }

                // Confirm that the color is added in menu and select the color.
                Manufacturers.manufacturerOrColor(channel + ' ' + uniqueId).click();

                // The color is open. Pass: name, 12NC and Order Code.
                Manufacturers.colorIsOpen(channel + ' ' + uniqueId, uniqueId, 'Order Code 1' + uniqueId);

            });

        }

    });

})