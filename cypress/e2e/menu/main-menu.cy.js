
/// <reference types="cypress" />

import TestMenuElements from '../../support/page_objects/menu-elements';

describe('Testing funcionality of the main menu.', () => {

    // Log in.
    beforeEach(() => {
        cy.loginToOptibin();
        cy.wait(1000);
    
    })

    it('Menu is collapsed after logging in.', () => {
        
        cy.get('#root')
            .find('.app-layout')
            .should('exist')
            .and('not.have.class', 'app-layout-expand');

    })

    it.only('Expand and collapse menu.', () => {
        
        // Expand menu
        cy.get('.app-layout-sidebar > .app-sidebar > .app-sidebar-toggle > .noactive')
        .click();

        cy.get('#root .app-layout-expand')
        .should('exist');

        // Collapse menu
        cy.get('.app-layout-sidebar > .app-sidebar > .app-sidebar-toggle > .active')
        .click();

        cy.get('#root .app-layout')
        .should('exist')
        .and('not.have.class', 'app-layout-expand');

        
    })

    it('Menu opens different pages. It should read JSON file from fixtures, find element by class, and click on it.', () => {

        cy.fixture('menu-elements.json').then((jsonArray) => {
            // Call the function to interact with HTML elements, passing the JSON array as a parameter.
            TestMenuElements.openPage(jsonArray);
          });

        // ElementInteraction.interactWithElements();

    })

})