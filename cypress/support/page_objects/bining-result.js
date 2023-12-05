
class BiningResult {

    // Fill all Inventory Count in both channels. Pass: channels and value.
    static biningResult(channels) {

        channels.forEach((channel) => {

            // Confirm that bining results are displayed on both channels.
            cy.get('.app-products-channels-block-item')
                .contains(channel)
                .click();

            // Wavelength channel has 'Recipe Wavelength' in results and chromaticity channel has 'Recipe Chromaticity' in results.
            // Chromaticity channel has a graph.
            if (channel === 'Wav 01 P2 (test 6)') {
                cy.get('tbody > :nth-child(1)').find('td').parent('tr').should('contain', 'Recipe Wavelength');
            } else if (channel === 'Chrom 1 P3 (test 6)') {
                cy.get('tbody > :nth-child(1)').find('td').parent('tr').should('contain', 'Recipe Chromaticity');
                // Chromaticity channel has a graph.
                cy.get('.mt10 > .app-btn-neutral').should('contain', 'Show results on graph').click();
                cy.get('.app-chromaticity-graph-wrapper').should('exist');
                // Close the graph.
                cy.get('.app-modal-content-close > img').click();
                cy.get('.app-chromaticity-graph').should('not.exist');
            }

            // Both channels have 'Bin Code' and 'Recipe Flux' in results.
            cy.get('tbody > :nth-child(1) > :nth-child(1)').should('contain', 'Bin Code');
            cy.get('tbody > :nth-child(1)').find('td').parent('tr').should('contain', 'Recipe Flux');
            // Both channels have 'Inventory Summary:' filed in results.
            cy.get(':nth-child(1) > .mt15').should('contain', 'Inventory Summary:');
            cy.get('.app-binning-results > :nth-child(1) > :nth-child(4) > :nth-child(1) > :nth-child(1)').should('contain', 'Bins');
            cy.get('.app-binning-results > :nth-child(1) > :nth-child(4) > :nth-child(2) > :nth-child(1)').should('contain', 'Starting');
            cy.get('.app-binning-results > :nth-child(1) > :nth-child(4) > :nth-child(3) > :nth-child(1)').should('contain', 'Used');
            cy.get('.app-binning-results > :nth-child(1) > :nth-child(4) > :nth-child(4) > :nth-child(1)').should('contain', 'Remained');
            cy.get('.app-binning-results > :nth-child(1) > :nth-child(4) > :nth-child(5) > :nth-child(1)').should('contain', '#LEDs Used');

        });

    }

}
  
export default BiningResult;
