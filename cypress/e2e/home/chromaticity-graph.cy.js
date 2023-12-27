/// <reference types="cypress" />

import Products from '../../support/page_objects/products';
import Manufacturers from '../../support/page_objects/manufacturers';

describe('Chromaticity graph window.', () => {

     // Log in.
     beforeEach(() => {
          cy.loginToOptibin();
          cy.wait(1000);
   
     })

     it('Chromaticity graph window.', () => {

        Manufacturers.manufacturerOrColor('Test P3').click();
        Manufacturers.manufacturerOrColor('Color chr').click();

        cy.wait(1000);

        cy.get('.app-btn-neutral.pl10.pr10.app-chromaticity-graph-btn').click();
        cy.get('.mt15.ml15').should('contain', 'Chromaticity');
        cy.get('.ml15.mt5').should('contain', 'Manufacturer: Test P3').and('contain', 'Color: Color chr');

        Products.closeWindow();
        Products.windowClosed();

     });

})