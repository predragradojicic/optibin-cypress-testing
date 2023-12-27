/// <reference types="cypress" />

import SelectProducts from '../../support/page_objects/select-products';

describe('Testing whether channels are present on Bining page.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
        cy.visitBiningPage();

    })
       
    it('Testing whether channels are present on Bining page.', () => {
        // Open Test P6 folder.
        SelectProducts.productInMenu('Test P6');

        // Sellect a bining product with no channels.
        SelectProducts.productInMenu('Bar 2');

        // Confirm that the channels field is empty.
        cy.get('.app-products-channels-block-items')
            .find('.app-text-gray.ml10')
            .contains('No items');

        // Sellect a bining product which one chromaticity channel and one wavelength channel.
        SelectProducts.productInMenu('Foo');

        // Channels name with body text of each channel.
        const channels = [
            { channel:'Chrom 1 P3 (test 6)', body_text:'Chromaticity: '},
            { channel:'Wav 01 P2 (test 6)', body_text:'Wavelength: '}
          ];

        // Confirm that both channels are present in the channels field. Confirm all elements are displayed in the channel's body.
        channels.forEach(({ channel, body_text }) => {
    
            cy.get('.app-products-channels-block-item').contains(channel).click();
            cy.contains(channel).should('have.class', 'active');
          
            // Confirm that all other channels don't have a red border
            channels.filter((otherChannel) => otherChannel !== channel).forEach((otherChannel) => {
                
                cy.contains(otherChannel.channel).should('not.have.css', 'active');

            });
            cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(1) > .app-text-gray').contains('Flux: ');
            cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(2) > .app-text-gray').contains(body_text);
            cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-text-gray').contains('Inventory Count:');
            cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input').should('have.value', '0');

        });

    })
})