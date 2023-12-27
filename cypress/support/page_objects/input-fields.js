
class InputFields {

    // Fill all Inventory Count in both channels. Pass: channels and value.
    static fillInventoryCount(channels, value) {

        // Channels.
        channels.forEach((channel) => {

            // Find the input element.
            cy.get('.app-products-channels-block-item')
                .contains(channel)
                .click();
                
            // Type the passed value in each input field.
            cy.get('.app-input.ml5').each(($input) => {
            
                cy.wrap($input).type('{selectall}').type(value);
        
            });
            
        });
    }

    // Testing arrows for increasing and decreasing values in input fields.
    static inputArrows(input_class) {

        cy.get(input_class).clear();
        cy.get(input_class).type('{uparrow}');
        cy.get(input_class).should('have.value', '1');
        cy.get(input_class).type('{downarrow}');
        cy.get(input_class).should('have.value', '0');
        cy.get(input_class).type('{selectall}').type('4').type('{uparrow}').type('{uparrow}');
        cy.get(input_class).should('have.value', '6');
        cy.get(input_class).type('{downarrow}').type('{downarrow}');
        cy.get(input_class).should('have.value', '4');    
    
    }

    static numberOfSetups() {

        return cy.get('.app-flex > :nth-child(3) > .app-input');
    
    }

    static spoolSize() {

        return cy.get('.app-flex > :nth-child(4) > .app-input');
    
    }

    static firstInventoryCount() {

        return cy.get(':nth-child(1) > div > :nth-child(1) > :nth-child(3) > .app-input');
    
    }
}
  
export default InputFields;
