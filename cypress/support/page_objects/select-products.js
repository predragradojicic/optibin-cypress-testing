
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

    // Confirm that Bining page is open.
    static biningPageIsOpen() {

        // Folder Test P6 is present on the page.
        cy.get('.app-products-folder-item')
            .contains('Test P6');
    
        // Confirm that Bining page is displayed.
        cy.get('.app-products-content > .app-width-100.app-text-center.mt10.mb10')
            .contains('Binning')
    
    };

    // Confirm that Query page is open.
    static queryPageIsOpen() {

        // Folder Test P6 is present on the page.
        cy.get('.app-nav-map-items')
            .contains('Test P6');
    
        // Confirm that Query button is displayed.
        cy.get('.app-btn-secondary').contains('Query');
    
    };
    
    // Open a product in menu.
    static productInMenu(folder_name) {
    
        // Select a folder from the Products menu.
        cy.get('.app-nav-map-item')
            .contains(folder_name)
            .click();
    };

    // Open a product in menu.
    static productInFolders(folder_name) {
    
        // Select a folder from the Products menu.
        cy.get('.app-products-folder')
            .contains(folder_name, { matchCase: false })
            .click();
    };

    // Click on item in breadcrumb menu.
    static productInBreadcrumbMenu(item) {
    
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .contains(item)
            .click();
    };

    // Confirm that the folder is open on Manufacturers page.
    static folderIsOpenOnManufacturersPage(title) {
        
        // Confirm that menu is displayed.
        cy.get('.app-nav-map-item.active')
            .contains(title);
    
        // Confirm that title is displayed.
        cy.get('.app-manufacturers-header-title-text-active')
            .contains(title);
    
    };
    
    // Confirm that the folder is open on Products page.
    static folderIsOpenOnProductsPage(title, ...menu_items) {

        // Confirm that title is displayed.
        cy.get('.app-products-header-title-text-active')
            .contains(title, { matchCase: false });

        menu_items.forEach((menu_item) => {
        
            // Confirm that menu is displayed.
            cy.get('.app-nav-map-items')
                .contains(menu_item, { matchCase: false });

            // Confirm that folders and fixtures are displayed.
            cy.get('.app-products-folder')
                .contains(menu_item, { matchCase: false });

        });

        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .should('contain', title, { matchCase: false });
    
    };

    static folderIsOpenOnBiningPage(title, ...menu_items) {

        // Confirm that title is displayed.
        cy.get('.app-width-100.app-text-center.mt10.mb10')
            .contains('Binning');

        menu_items.forEach((menu_item) => {
        
            // Confirm that menu is displayed.
            cy.get('.app-nav-map-items')
                .contains(menu_item, { matchCase: false });

            // Confirm that folders and fixtures are displayed.
            cy.get('.app-products-folder')
                .contains(menu_item, { matchCase: false });

        });

        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .should('contain', title, { matchCase: false });
    
    };

    // Confirm that the folder is open on Query page.
    static folderIsOpenOnQueryPage(title, ...menu_items) {

        menu_items.forEach((menu_item) => {
        
            // Confirm that menu is displayed.
            cy.get('.app-nav-map-items')
                .contains(menu_item);

        });
    
        // Confirm that Query button is displayed.
        cy.get('.app-btn-secondary').contains('Query');

        cy.get('.app-nav-map-items')
            .find('.app-nav-map-beadcrumb')
            .should('contain', title);
    
    };
    
    // Confirm that fixture is open on Products and Bining pages.
    static fixtureIsOpen(fixture_title, body_messagge) {
    
        // Confirm that menu is displayed.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item.active')
            .contains(fixture_title);
    
        // Confirm that title is displayed.
        cy.get('.app-products-header-title-text.mb10')
            .find('.app-products-header-title-text-active')
            .contains(fixture_title);
    
        // Confirm that body message is displayed.
        cy.get('.app-width-100.app-text-gray.app-text-center.mt40')
            .contains(body_messagge);
    
    };

    // Confirm that fixture is open on Query page.
    static fixtureIsOpenOnQuery(menu_item) {
    
        // Confirm that menu is displayed.
        cy.get('.app-nav-map-items')
            .find('.app-nav-map-item.active')
            .contains(menu_item);
    
         // Confirm that Query button is displayed.
         cy.get('.app-btn-secondary').contains('Query');
    
    };

    // All items are visible.
    static numberOfProducts(number) {
    
        cy.get('.app-nav-map-items')
          .find('.app-nav-map-item')
          .should('have.length', number);

        return cy.get('.app-nav-map-item');
    };

    static searchBar() {
    
        return cy.get('.app-nav-map-filter')
            .find('.app-input');
    
    };

  }
  
  export default SelectProducts;


  