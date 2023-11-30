
class InventoryCount {

    static fillInventoryCount(value) {

        const channels = ['Chrom 1 P3 (test 6)', 'Wav 01 P2 (test 6)'];

        channels.forEach((channel) => {

            // Find the input element using :nth-child(3) > .app-input
            cy.get('.app-products-channels-block-item')
                .contains(channel)
                .click();
                
            cy.get('.app-input.ml5').each(($input) => {
                // Use the .type() function to type the value "5" into each input field
                cy.wrap($input).type('{selectall}').type(value);
            
            });
            
        });
    }
}
  
export default InventoryCount;
