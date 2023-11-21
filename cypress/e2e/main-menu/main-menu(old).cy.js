
/// <reference types="cypress" />

describe('Testing funcionality of the main menu.', () => {

    beforeEach(() => {
        cy.loginToOptibin();
    
    })

    it('Menu is collapsed after logging in.', () => {
        
        cy.get('#root') //.find('.app-layout ').should('exist');
            .find('.app-layout')
            .should('exist')
            .and('not.have.class', 'app-layout-expand');

    })

    it('Expand and collapse menu.', () => {
        
        //Expand menu.
        cy.get('.app-layout-sidebar > .app-sidebar > .app-sidebar-toggle > .noactive').click();
        cy.get('#root')
            .find('.app-layout.app-layout-expand')
            .should('exist')

        //Collapse menu.
        cy.get('.app-layout-sidebar > .app-sidebar > .app-sidebar-toggle > .active').click();
        cy.get('#root')
            .find('.app-layout')
            .should('exist')
            .and('not.have.class', 'app-layout-expand');
        
    })

    it('Menu opens different pages.', () => {

        //Open Products page.
        cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(3) > .noactive').click();
        //Confirm that correct element is active on the menu.
        cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(3)').should('have.class', 'active');
        //Confirm that Products page is open.
        cy.get('.app-layout> .app-layout-main> .app-products').should('exist');

        //Open Bining page.
        cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(4) > .noactive').click();
        //Confirm that correct element is active on the menu.
        cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(4)').should('have.class', 'active');
        //Confirm that Bining page is open.
        cy.get('.app-layout> .app-layout-main> .app-products.app-bining').should('exist');

        //Open Query page.
        cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(5) > .noactive').click();
        //Confirm that correct element is active on the menu.
        cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(5)').should('have.class', 'active');
        //Confirm that Query page is open.
        cy.get('.app-layout> .app-layout-main> .app-products.app-query').should('exist');

        //Open Accounts page.
        cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(6) > .noactive').click();
        //Confirm that correct element is active on the menu.
        cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(6)').should('have.class', 'active');
        //Confirm that Accounts page is open.
        cy.get('.app-layout> .app-layout-main> .app-accounts').should('exist');

        //Open Home page.
        cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(2) > .noactive').click();
        //Confirm that correct element is active on the menu.
        cy.get('.app-layout-sidebar > .app-sidebar > :nth-child(2)').should('have.class', 'active');
        //Confirm that Home page is open.
        cy.get('.app-layout> .app-layout-main> .app-manufacturers').should('exist');

    })

})