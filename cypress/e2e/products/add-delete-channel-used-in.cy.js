/// <reference types="cypress" />

import Products from '../../support/page_objects/products';
import SelectProducts from '../../support/page_objects/select-products';

import Manufacturers from '../../support/page_objects/manufacturers';
import IncorrectValues from '../../support/page_objects/incorrect-values';

describe('Adding, editing and deleting products on Products page.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);

    })

    it('Add a channel.', () => {

        cy.visitProductsPage();

        // Open Test P6 folder.
        SelectProducts.productInFolders('Test P6');

        SelectProducts.productInFolders('Foo');

        Products.addChannel();

        cy.get('.app-products-channels-add-title').should('contain', 'Add Channel');

        Products.buttonDisabled('Save');

        Products.closeWindow();
        Products.windowClosed();
        Products.addChannel();

        cy.get('.ml20.mr20.mt10').find('.app-input').select('141').contains('Test P3');
        cy.wait(1000);

        Products.buttonDisabled('Save');

        cy.get('.app-input') 
            .eq(1)             
            .select('Color chr');

        Products.buttonEnabled('Save');
        Products.clickOnButton('Save');

        Products.windowClosed();

        Products.channel().should('contain', 'Color chr');

    });

    it('The channel is present in "Used in" window on Home page.', () => {

        Manufacturers.manufacturerOrColor('Test P3').click();
        Manufacturers.manufacturerOrColor('Color chr').click();

        cy.wait(1000);

        cy.get('.app-btn-neutral.app-color-used-in').contains('Used In').click();
        cy.get('.p15.m0').should('contain', 'Color chr color is used in');
        cy.get('.app-color-usedin.pl15.pr15.pb15').should('contain', 'Foo');

        Products.closeWindow();
        Products.windowClosed();

    });

    it('Delete a channel.', () => {

        cy.visitProductsPage();

        SelectProducts.productInFolders('Test P6');

        SelectProducts.productInFolders('Foo');

        Products.channel().contains('Color chr').click();

        Products.deleteChannel();

        Products.windowIsOpen('Are you sure');

        Products.closeWindow();
        Products.windowClosed();

        Products.channel().should('contain', 'Color chr');

        Products.deleteChannel();

        Products.clickOnButton('No');

        Products.windowClosed();

        Products.channel().should('contain', 'Color chr');

        Products.deleteChannel();

        Products.clickOnButton('Yes');

        Products.windowClosed();

        Products.channel().find('Color chr').should('not.exist');

    });

});