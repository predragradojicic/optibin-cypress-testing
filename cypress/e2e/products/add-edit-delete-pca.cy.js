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

    it('PCA input fields validation.', () => {
        // Open Test P6 folder.
        SelectProducts.productInFolders('Test P6');

        SelectProducts.productInFolders('Foo');

        // Click on Add.
        Products.addPCA();

        cy.get('.m20').should('contain', 'Add PCA Number')

        Products.firstPCA().should('have.class', 'app-border-red');
        Products.secondPCA().should('have.class', 'app-border-red');
        Products.nc().should('not.have.class', 'app-border-red');
        Products.buttonDisabled('Save');

        IncorrectValues.incorrectPCA('incorrect-pca-1.json', '.mr20 > :nth-child(2)', 'Save');
        InputFields.inputArrows('.mr20 > :nth-child(2)');
        IncorrectValues.incorrectPCA('incorrect-pca-2.json', '.mr20 > :nth-child(4)', 'Save');
        InputFields.inputArrows('.mr20 > :nth-child(4)');

        InputFields.inputArrows('.mt10 > .app-input');

        Products.firstPCA().clear().type('123456');
        Products.firstPCA().should('not.have.class', 'app-border-red');
        Products.buttonDisabled('Save');

        Products.firstPCA().clear()
        Products.secondPCA().clear().type('12');
        Products.secondPCA().should('not.have.class', 'app-border-red');
        Products.buttonDisabled('Save');

        Products.firstPCA().clear().type('123456');
        Products.buttonEnabled('Save');

        Products.closeWindow();
        Products.windowClosed();

    });

    it('Add a PCA number.', () => {
        // Open Test P6 folder.
        SelectProducts.productInFolders('Test P6');

        SelectProducts.productInFolders('Foo');

        // Click on Add.
        Products.addPCA();

        Products.firstPCA().type('112235');
        Products.secondPCA().type('55');
        Products.nc().type(nc_12);

        Products.buttonEnabled('Save');
        Products.clickOnButton('Save');

        Products.windowClosed();

        Products.pcaNumbers('PCA-112235-55');
        Products.ncNumbers(nc_12);

    });

    it('Edit a PCA number.', () => {

        // Open Test P6 folder.
        SelectProducts.productInFolders('Test P6');

        SelectProducts.productInFolders('Foo');

        Products.ncNumbers(nc_12).click();

        cy.get('.m20').should('contain', 'Edit PCA Number')

        Products.closeWindow();
        Products.windowClosed();

        Products.ncNumbers(nc_12).click();

        Products.firstPCA().type('112236');
        Products.secondPCA().type('56');
        Products.nc().type(nc_12b);

        Products.clickOnButton('Save');

        Products.windowClosed();

        // Confirm that 'PCA-112233-11' exists
        Products.pcaNumbers('PCA-112236-56');
        Products.ncNumbers(nc_12b);

    });

    it('Delete a PCA number.', () => {

        // Open Test P6 folder.
        SelectProducts.productInFolders('Test P6');

        SelectProducts.productInFolders('Foo');

        Products.deletePCA('PCA-112236-56');

        Products.windowIsOpen('Are you sure');

        Products.closeWindow();
        Products.windowClosed();

        Products.deletePCA('PCA-112236-56');

        Products.clickOnButton('No');

        Products.windowClosed();

        Products.deletePCA('PCA-112236-56');

        Products.clickOnButton('Yes');

        Products.windowClosed();

        cy.get('.app-products-numbers-block-item')
            .contains('PCA-112236-56')
            .should('not.exist');

    });

});