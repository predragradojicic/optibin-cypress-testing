
class InputArrows {

    static inputArrows(input_class) {

        cy.get(input_class).type('{uparrow}');
        cy.get(input_class).should('have.value', '1');
        cy.get(input_class).type('{downarrow}');
        cy.get(input_class).should('have.value', '0');
        cy.get(input_class).type('{selectall}').type('4').type('{uparrow}').type('{uparrow}');
        cy.get(input_class).should('have.value', '6');
        cy.get(input_class).type('{downarrow}').type('{downarrow}');
        cy.get(input_class).should('have.value', '4');    
    
    }
}
  
export default InputArrows;
