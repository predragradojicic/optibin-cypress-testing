/// <reference types="cypress" />

import Products from '../../support/page_objects/products';
import SelectProducts from '../../support/page_objects/select-products';
import IncorrectValues from '../../support/page_objects/incorrect-values';
import InputFields from '../../support/page_objects/input-fields';

describe('Adding, editing and deleting products on Products page.', () => {

     // Log in.
     beforeEach(() => {
         cy.loginToOptibin();
         cy.wait(1000);
         cy.visitProductsPage();
   
     })

     // Date (miliseconds) to string. The string is unique.
     const uniqueId = Date.now().toString();
     const nc_12 = uniqueId - 1702648298748;
     const nc_12b = nc_12 + 1;

     it('Check initial values in input fields.', () => {

        SelectProducts.productInFolders('Test P6');

        SelectProducts.productInFolders('Foo');

        Products.channel().contains('Color wav').click();

        Products.forwardVoltageBins('On');

        // const placeholder = 'Target';

        // cy.get('.app-product-channel-details-common-properties-block').contains('Flux Bins').then(bin => {
        //     cy.wrap(bin).get(`input[placeholder="${placeholder}"]`).clear().type('{selectall}').type('57');
        // })

        // cy.get('.app-product-channel-details-common-properties-block')
        //     .contains('Target')
        //     .siblings('input')
        //     .should('have.attr', 'placeholder', 'Target');

        // cy.contains('.app-product-channel-details-common-properties-block', 'Target').find('input[placeholder="Target"]');

        const input_fields = ['LEDs Per Pixel', 'Number Of Pixels', 'Delta X', 'Minimum Flux', 'Maximum Flux', 'Minimum Forward Voltage', 'Maximum Forward Voltage', 'Minimum Wavelength', 'Maximum Wavelength'];

        input_fields.forEach(field => {
            // Products.input(field).should('have.value', '0');
            // cy.contains('.app-product-channel-details-common-properties-block', field).find(`input[placeholder="${field}"]`).should('have.value', '0');

            Products.inputFields(field, '0');
        })

        // const bins = [
        //     { field: 4, input: 6 },
        //     { field: 4, input: 7 },
        //     { field: 5, input: 6 },
        //     { field: 5, input: 7 }
        // ];          

        // bins.forEach(bin => {
        //     cy.get(`.app-product-channel-details-common-properties > :nth-child(${bin.field}) > :nth-child(${bin.input}) > .app-input`).should('have.value', '0');

        // })

        const diverse_inputs = ['Diverse Flux', 'Diverse Wavelength'];

        diverse_inputs.forEach(diverse_input => {
            Products.input(diverse_input).should('have.value', '1');

        })

       
    });

    it('Check initial values in input fields.', () => {

        SelectProducts.productInFolders('Test P6');

        SelectProducts.productInFolders('Foo');

        Products.channel().contains('Color wav').click();

        Products.forwardVoltageBins('On');

        const input_fields = ['LEDs Per Pixel', 'Number Of Pixels', 'Delta X', 'Minimum Flux', 'Maximum Flux', 'Target', 'Offset', 'Minimum Forward Voltage', 'Maximum Forward Voltage', 'Minimum Wavelength', 'Maximum Wavelength'];

        input_fields.forEach(field => {
            
            IncorrectValues.incorrectProductInputs('incorrect-flux-voltage-wavelength-chromaticity.json', field, 'Cancel');

        })

    });

});