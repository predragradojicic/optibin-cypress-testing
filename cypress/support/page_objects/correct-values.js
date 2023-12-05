
class CorrectValues {

    // Type correct values in the input field. Pass: the input field.
    static correctValues(input_element) {

      cy.fixture('correct-values.json').then((data) => {
          // Iterate over the values in the JSON file
          data.values.forEach((value) => {
            cy.get(input_element)
              .clear()
              .type('{selectall}').type(value);

            // Click outside and check if the value is present and the class is correct.
            cy.get('.app-navbar-title')
              .click();

            // The value is present in the input field. Border should not be red.
            cy.get(input_element)
              .should('have.value', value)
              .should('have.class', 'app-input');

          });
      });
    }
  }
  
  export default CorrectValues;
