
class IncorrectValues {
    // Enters incorrect values in the input field. Pass: JSON file from fixtures which contains incorrect values and the input field.
    static incorrectValues(input_data, input_element) {

      cy.fixture(input_data).then((data) => {
        // Iterate over the values in the JSON file
        data.values.forEach((value) => {
             // Find the input element and type values from JSON file.
            cy.get(input_element)
              .clear()
              .type('{selectall}').type(value);

             // Click outside of the input element.
              cy.get('.app-navbar-title')
                .click();

             // Border should be red.
              cy.get(input_element)
                .should('have.class', 'app-border-red');

        });
      });
    }

    // Enters unsupported data in Inventory Count. Pass: JSON file from fixtures which contains incorrect values and the input field.
    static unsupportedInventory(input_data, input_element) {

      cy.fixture(input_data).then((data) => {
        // Iterate over the values in the JSON file
        data.values.forEach((value) => {
             // Find the input element and type values from JSON file.
              cy.get(input_element)
                .clear()
                .type('{selectall}').type(value);

             // Click outside of the input element.
              cy.get('.app-navbar-title')
                .click();

             // Border should be red.
              cy.get(input_element)
                .should('have.value', '0');

        });
      });
    }

    static incorrectPCA(input_data, input_element,button) {

      cy.fixture(input_data).then((data) => {
        // Iterate over the values in the JSON file
        data.values.forEach((value) => {
             // Find the input element and type values from JSON file.
            cy.get(input_element)
              .clear()
              .type('{selectall}').type(value);

             // Click outside of the input element.
              // cy.get('.m20').contains('Add PCA Number').click();

             // Border should be red.
              cy.get(input_element)
                .should('have.class', 'app-border-red');

              cy.contains('button', button).should('be.disabled');

        });
      });
    }

    static incorrectFluxVoltageWavelengthCromaticity(input_data, input_element, ...button) {

      cy.fixture(input_data).then((data) => {
        // Iterate over the values in the JSON file
        data.values.forEach((value) => {
             // Find the input element and type values from JSON file.
            cy.get(input_element).clear().type('{selectall}').type(value);

            // Border should be red.
            cy.get(input_element).should('have.class', 'app-border-red');

            button.forEach((item) => {
              cy.get('button').contains(item).should('be.disabled');

            });

        });
      });
    }

    static incorrectChromaticity(input_data, input_element, ...button) {

      cy.get('.app-chromacity-form-content-div50, .ml20.mr20.mt10').contains(input_element).siblings('input').then((data1) => {
        cy.fixture(input_data).then((data) => {
          // Iterate over the values in the JSON file
          data.values.forEach((value) => {
              // Find the input element and type values from JSON file.
              cy.get(data1).clear().type('{selectall}').type(value);

              // Border should be red.
              cy.get(data1).should('have.class', 'app-border-red');

              button.forEach((item) => {
                cy.get('button').contains(item).should('be.disabled');

              });

          });
        });

      });
        
    }

    static incorrectProductInputs(input_data, input_element, button) {

      cy.get(`input[placeholder="${input_element}"]`).should('not.have.class', 'app-border-red');

      cy.get(`input[placeholder="${input_element}"]`).clear();

      cy.get(`input[placeholder="${input_element}"]`).should('have.class', 'app-border-red');

      cy.get('button').contains(button).should('exist');

      // cy.get(`input[placeholder="${input_element}"]`).clear().type('{selectall}').type('0');
      // cy.get('.app-product-channel-shortlisted-bins-content').click();

      // cy.get(`input[placeholder="${input_element}"]`).should('not.have.class', 'app-border-red');

      // cy.get('button').contains(button).should('not.exist');

      cy.fixture(input_data).then((data) => {
        // Iterate over the values in the JSON file
        data.values.forEach((value) => {
            // Find the input element and type values from JSON file.

            cy.contains('.app-product-channel-details-common-properties-block', input_element).find(`input[placeholder="${input_element}"]`).clear().type('{selectall}').type(value);

            cy.contains('.app-product-channel-details-common-properties-block', input_element).find(`input[placeholder="${input_element}"]`).should('have.class', 'app-border-red');

            cy.get('button').contains(button).should('exist');

        });
      });
    }

  }
  
  export default IncorrectValues;
