
class TestMenuElements {
    static openPage(jsonArray) {

      // Iterate over each object in the JSON array.
      jsonArray.forEach((element) => {

        // Construct the selector.
        const element_on_the_menu = `${element.menu_element}`;
        const page = `${element.page}`;
  
        // Find the HTML element by class and click on it.
        cy.get(element_on_the_menu).click();

        // Confirm that the page is open.
        cy.get(page).should('exist');
  
      });
    }
  }
  
  export default TestMenuElements;
