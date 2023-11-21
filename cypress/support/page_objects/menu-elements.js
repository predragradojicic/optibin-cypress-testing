
class TestMenuElements {
    static openPage(jsonArray) {

      // Iterate over each object in the JSON array.
      jsonArray.forEach((element) => {

        // Construct the selector.
        const element_on_the_menu = `${element.menu_element}`;
        const page = `${element.page}`;
  
        // Find the HTML element by class and click on it.
        cy.get(element_on_the_menu).click();
        // Confirm that the element is active on the menu.
        // cy.get(element_on_the_menu).should('have.class', 'active');
        // Confirm that the page is open.
        cy.get(page).should('exist');
  
      });
    }
  }
  
  export default TestMenuElements;






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
  