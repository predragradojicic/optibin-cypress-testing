
class Manufacturers {

    static windowIsOpen(title) {
        return cy.get('.app-manufacturer-add, .app-yes-no-modal, .app-color-add')
        .find('h2', title);
    }

    static closeWindow() {
        cy.get('.app-modal-content-close')
            .click();
    }

    static windowClosed() {
        return cy.get('.app-manufacturer-add, .app-yes-no-modal, .app-color-add').should('not.exist');
    }

    static buttonDisabled(button) {
        return cy.contains('button', button).should('be.disabled');
    }

    static typeName(name) {
        cy.get('input[placeholder*="Name"]').clear()
            .type(name);
    }

    static typeOrderCode(code) {
        cy.get('input[placeholder*="Order Code"]').clear()
            .type(code);
    }

    static type12NC(NC) {
        cy.get('input[placeholder*="12NC"]').clear()
            .type(NC);
    }

    static clickOnButton(button) {
        cy.contains('button', button).click();
    }

    static manufacturerOrColor(name) {
        return cy.get('.app-nav-map-item')
        .contains(name);
    }

    static manufacturerButton(button) {
        return cy.get('.app-manufacturer-add-btn, .app-manufacturer-del-btn, .app-manufacturer-add-btn')
            .contains(button);
    }

    static colorButton(button) {
        return cy.get('.app-color-add-btn, .app-color-used-in, .app-color-del-btn')
            .contains(button);
    }

    static editManufacturer(added_name) {
        cy.get('.app-manufacturer-add')
            .find('.app-input')
            .click()
            .clear()
            .type(added_name);
    }

    static colorIsOpen(name, nc, code) {
       cy.get('.app-color-data-header-title-text-active').should('contain', name);
       cy.get('.app-color-data-header-subtitle > :nth-child(1)').should('contain', nc);
       cy.get('.app-color-data-header-subtitle > :nth-child(3)').should('contain', code);
    }

    static colorIsClosed(name) {
        return cy.get('.app-color-data-header-title-text-active').contains(name).should('not.exist');
    }

    static addFlux() {
        cy.get('.app-flux > .app-data-view > .app-data-view-title > .app-cursor-pointer').click();
        cy.get('.app-json-object-edit-title').should('contain', 'Flux');
    }

    static fluxIsOpen() {
        cy.get('.app-json-object-edit-title').should('contain', 'Flux');
    }

    static fluxBin() {
        return cy.get('.ml20.mr20.mt10').contains('Flux Bin').siblings('input');
    }

    static minValue() {
        return cy.get('.ml20.mr20.mt10').contains('Min').siblings('input');
    }

    static maxValue() {
        return cy.get('.ml20.mr20.mt10').contains('Max').siblings('input');
    }

    static selectUnit() {
        return cy.get('.ml20.mr20.mt10').contains('Unit').siblings('select');
    }

    static selectFlux(flux) {
        return cy.get('.app-flux .app-data-view-row-hover').contains(flux);
    }

    static deleteFlux(flux) {
        cy.get('.app-data-view-col').contains(flux).siblings('.app-cursor-pointer').click();
    }

    static addForvardVoltage() {
        cy.get('.app-forward-voltage > .app-data-view > .app-data-view-title > .app-cursor-pointer').click();
        cy.get('.app-json-object-edit-title').should('contain', 'Forward Voltage');
    }

    static forvardVoltageIsOpen() {
        cy.get('.app-json-object-edit-title').should('contain', 'Forward Voltage');
    }

    static selectForvardVoltage(forvard_voltage) {
        return cy.get('.app-forward-voltage .app-data-view-row-hover').contains(forvard_voltage);
    }

    static deleteForvardVoltage(forvard_voltage) {
        cy.get('.app-data-view-col').contains(forvard_voltage).siblings('.app-cursor-pointer').click();
    }

    static forvardVoltageId() {
        return cy.get('.ml20.mr20.mt10').contains('ID').siblings('input');
    }

    static colorBin() {
        return cy.get('.ml20.mr20.mt10').contains('Color Bin').siblings('input');
    }

    static addWavelength() {
        cy.get('.app-wavelength > .app-data-view > .app-data-view-title > .app-cursor-pointer').click();
        cy.get('.app-json-object-edit-title').should('contain', 'Wavelength');
    }

    static wavelengthIsOpen() {
        cy.get('.app-json-object-edit-title').should('contain', 'Wavelength');
    }

    static errorMessage() {
        return cy.get('.app-text-darkred.ml20.mr20.mt10');
    }

    static selectWavelength(wavelength) {
        return cy.get('.app-data-view-col').contains(wavelength);
    }

    static wavelengthIsOpen() {
        cy.get('.app-json-object-edit-title').should('contain', 'Wavelength');
    }

    static deleteWavelength(wavelength_name) {
        cy.get('.app-data-view-col').contains(wavelength_name).siblings('.app-cursor-pointer').click();
    }

    static addChromaticity() {
        cy.get('.app-chromaticity > .app-data-view > .app-data-view-title > .app-cursor-pointer').click();
        cy.get('.app-chromacity-form-title').should('contain', 'Chromaticity');
    }

    static chromaticityIsOpen() {
        cy.get('.app-chromacity-form-title').should('contain', 'Chromaticity');
    }

    static chromaticityName() {
        return cy.get('.app-chromacity-form-content-div').contains('Name').siblings('input');
    }

    static chromaticityType() {
        return cy.get('.app-chromacity-form-content-div').contains('Type').siblings('select');
    }

    static chromaticityCoordinate(coordinate) {
        return cy.get('.app-chromacity-form-content-div50').contains(coordinate).siblings('input');
    }

    static selectValue(value) {
        return cy.get('.ml20.mr20.mt10').contains(value).siblings(':input');
    }

    static selectColorType(value) {
        cy.get('.mt15').contains('Type').next('.app-input').select(value);

    }

}
  
export default Manufacturers;
