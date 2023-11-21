
class IncorrectValues {
    static incorrectValues() {

      cy.fixture('incorrect-values.json').then((data) => {
        // Iterate over the values in the JSON file
        data.values.forEach((value, index) => {
             // Find the input element using :nth-child(3) > .app-input
             cy.get(':nth-child(3) > .app-input').type(value);

             cy.get('.app-flex')
             .click();
             cy.get(':nth-child(3) > .app-input')
                  .should('have.class', 'app-border-red');

             // "Run" button should not be clickable.
             cy.get('.app-btn-secondary').should('be.disabled');

        });
      });
    }
  }
  
  export default IncorrectValues;






// // Create a class to handle element interactions
// class ElementInteraction {
//     // Function to interact with HTML elements based on JSON data
//     static interactWithElements() {
//       // Read the JSON file from the fixtures folder
//       cy.fixture('menu-elements.json').then((jsonArray) => {
//         // Iterate over each object in the JSON array
//         jsonArray.forEach((element) => {
//           // Construct the selector using class
//           const selector = `${element.Page}`;
  
//           // Find the HTML element by class and click on it
//           cy.get(selector).click();
  
//           // Add additional assertions or interactions as needed
//         });
//       });
//     }
//   }
  
//   // Export the class
//   export default ElementInteraction;
  