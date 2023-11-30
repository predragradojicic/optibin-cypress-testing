
class IncorrectValues {
    static incorrectValues(input_data, input_element) {

      cy.fixture(input_data).then((data) => {
        // Iterate over the values in the JSON file
        data.values.forEach((value) => {
             // Find the input element and type values from JSON file.
             cy.get(input_element).clear().type('{selectall}').type(value);

             // Click outside of the input element.
             cy.get('.app-navbar-title')
             .click();

             // Border should be red.
             cy.get(input_element)
                  .should('have.class', 'app-border-red');

        });
      });
    }

    static unsupportedInventory(input_data, input_element) {

      cy.fixture(input_data).then((data) => {
        // Iterate over the values in the JSON file
        data.values.forEach((value) => {
             // Find the input element and type values from JSON file.
             cy.get(input_element).clear().type('{selectall}').type(value);

             // Click outside of the input element.
             cy.get('.app-navbar-title')
             .click();

             // Border should be red.
             cy.get(input_element)
                  .should('have.value', '0');

        });
      });
    }
  }
  
  export default IncorrectValues;
