
class Products {

    static productButton(button) {
        return cy.get('.app-product-add-btn, .app-product-del-btn')
            .contains(button);
    }

    static channelButton(button) {item
        return cy.get('.app-products-channels-block-item, .app-products-channels-block-add, .app-products-numbers-block-item')
            .contains(button);
    }

    static deleteChannel() {
        cy.get('.app-product-channel-details-container-x').click();
    }

    static windowIsOpen(title) {
        return cy.get('.app-product-add, .app-yes-no-modal, .app-color-add')
        .find('h2', title);
    }

    static closeWindow() {
        cy.get('.app-modal-content-close')
            .click();
    }

    static windowClosed() {
        return cy.get('.app-product-add, .app-yes-no-modal, .app-color-add, app-modal-content').should('not.exist');
    }

    static buttonDisabled(...button) {
        button.forEach((item) => {
            cy.get('button').contains(item).should('be.disabled');

        });
        // return cy.contains('button', button).should('be.disabled');
    }

    static buttonEnabled(...button) {
        button.forEach((item) => {
            cy.get('button').contains(item).should('not.be.disabled');

        });
        // return cy.contains('button', button).should('not.be.disabled');
    }

    static typeName(name) {
        cy.get('input[placeholder*="Name"]').clear()
            .type(name);
    }

    static typeDescription(code) {
        cy.get('input[placeholder*="Description"]').clear()
            .type(code);
    }

    static selectValue(title, value) {
        cy.contains('.app-w-50', title)
            .find('select')
            .select(value);
    }

    // cy.contains(title).parent().parent()
    //         .find('select')
    //         .select(value);

    static selectType(value) {
        cy.get('.app-product-add > :nth-child(7)').select(value);
    }

    static selectFixtureType(value) {
        cy.get('.mt10').contains('Fixture Type').next('.app-input').select(value);

    }

    static clickOnButton(button) {
        cy.contains('button', button).click();
    }

    static productInMenu(name) {
        return cy.get('.app-nav-map-item')
        .contains(name);
    }

    static editProduct(added_name) {
        cy.get('.app-manufacturer-add')
            .find('.app-input')
            .click()
            .type(added_name);
    }

    static confirmDescription(description) {
        cy.get('.mr20').contains(description);
    }

    static addPCA() {
        cy.get('.app-products-numbers-block-add').click();
    }

    static firstPCA() {
        return cy.get('.mr20 > :nth-child(2)');
    }

    static secondPCA() {
        return cy.get('.mr20 > :nth-child(4)');
    }

    static nc() {
        return cy.get('.mt10 > .app-input');
    }

    static pcaNumbers(pca) {
        cy.get('.app-products-numbers-block-item').should('contain', pca);
    }

    static ncNumbers(nc_12) {
        cy.get('.app-products-numbers-block-item').find('.app-text-gray').should('contain', nc_12);
    }

    static addChannel() {
        cy.get('.app-products-channels-block-add').click();
    }

    static channel() {
        return cy.get('.app-products-channels-block-item');
    }

    static deleteChannel() {
        cy.get('.app-product-channel-details-container-x').click();
    }

    static deletePCA(pca) {
        cy.get('.app-products-numbers-block-item')
        .contains(pca)
        .find('.ml15').click();
    }

    

    












    static type12NC(NC) {
        cy.get('input[placeholder*="12NC"]').clear()
            .type(NC);
    }

    static colorButton(button) {
        return cy.get('.app-color-add-btn, .app-color-used-in, .app-color-del-btn')
            .contains(button);
    }

    static colorIsOpen(name, nc, code) {
       cy.get('.app-color-data-header-title-text-active').should('contain', name);
       cy.get('.app-color-data-header-subtitle > :nth-child(1)').should('contain', nc);
       cy.get('.app-color-data-header-subtitle > :nth-child(3)').should('contain', code);
    }

    static colorIsClosed(name) {
        return cy.get('.app-color-data-header-title-text-active').contains(name).should('not.exist');
     }

}
  
export default Products;
