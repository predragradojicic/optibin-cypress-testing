
class SelectProducts {

    // Confirm that Products page is open.
    static productsPageIsOpen() {

        // Folder Test P6 is present on the page.
        cy.get('.app-products-folder-item')
            .contains('Test P6');
    
        // The page does not have a title.
        cy.get('.app-products-content > .app-width-100.app-text-center.mt10.mb10')
            .should('not.exist');
    
    };

    static biningPageIsOpen() {

        // Folder Test P6 is present on the page.
        cy.get('.app-products-folder-item')
            .contains('Test P6');
    
        // Confirm that Bining page is displayed.
        cy.get('.app-products-content > .app-width-100.app-text-center.mt10.mb10')
            .contains('Binning')
    
    };
    
    // Open a folder.
    static openFolder(folder_name) {
    
        // Select a folder from the Products menu.
        cy.get('.app-nav-map-item')
            .contains(folder_name)
            .click();
    };
    
    // Confirm that the folder is open on Products page.
    static folderIsOpenOnProductsPage(menu_item, title, folder_item) {
        
        // Confirm that menu is displayed.
        cy.get('.app-nav-map-items')
            .contains(menu_item);
    
        // Confirm that title is displayed.
        cy.get('.app-products-header-title-text-active')
            .contains(title);
    
        // Confirm that folder is open.
        cy.get('.app-products-folder')
            .contains(folder_item);
    
    };

    // Confirm that the folder is open on Bining page.
    static folderIsOpenOnBiningPage(menu_item, folder_item) {
        
        // Confirm that title is displayed.
        cy.get('.app-width-100.app-text-center.mt10.mb10')
            .contains('Binning');

        // Confirm that menu is displayed.
        cy.get('.app-nav-map-items')
            .contains(menu_item);
    
        // Confirm that folder is open.
        cy.get('.app-products-folder')
            .contains(folder_item);
    
    };
    
    // Confirm that the fixture is open.
    static fixtureIsOpen(menu_item, fixture_title, body_messagge) {
    
        // Confirm that menu is displayed.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item.active')
            .contains(menu_item);
    
        // Confirm that title is displayed.
        cy.get('.app-products-header-title-text.mb10')
            .find('.app-products-header-title-text-active')
            .contains(fixture_title);
    
        // Confirm that body message is displayed.
        cy.get('.app-width-100.app-text-gray.app-text-center.mt40')
            .contains(body_messagge);
    
    };
  }
  
  export default SelectProducts;


  