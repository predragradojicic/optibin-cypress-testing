/// <reference types="cypress" />

//Import a class 'Login', which has defined functions for this test.
import LoginOptibin from '../../support/page_objects/login'
//Import a JSON file which contains credentials for logging in.
const login_credentials = require('../../fixtures/test-credentials-for-login.json')

describe('Log in Optibin.', () => { 

    beforeEach(() => {

        cy.fixture('login-credentials.json').then((login_page) => {
            cy.visit(login_page.optibin_URL);
        })

    })

    //Each object from the JSON file is a login combination. Iterate through these objects.
    login_credentials.forEach((credentials) => {

        //Writes the object's during the Cypress run.
        it.only(credentials.name, () => {

            //Instantiate the imported class.
            const login_optibin = new LoginOptibin();

            //First test combinations which are not empty: correct credentials and incorrect credentials.
            if (credentials.name !== 'Log in with empty credentials.') {

                //Use 'typeUsername', 'typePassword' and 'clickLogin' functions, defined in the imported class, for log in.
                login_optibin.typeUsername(credentials.user);
                login_optibin.typePassword(credentials.password);
                login_optibin.clickLogin();
                cy.wait(1000);

                //For correct credentials, comfirm that the user is logged in.
                if(credentials.name === 'Log in with correct credentials.'){
                    cy.get('.active').should('contain', 'Home');

                //For incorrect credentials:
                } else {
                    //Comfirm that the error message is displayed.
                    cy.get('.interact-identity-error-panel').contains('Your login details were not recognized. Please try again.');

                    //Comfirm that the user is not logged in.
                    cy.get('#username').should('have.attr', 'placeholder', 'Email');

                }

            //Test combinations with one or more empty fields.    
            } else if (credentials.name === 'Log in with empty credentials.') {
                
                //Array of functions: login with empty username, empty password and with both credentials empty.
                var arrayOfFunctions = [];
                arrayOfFunctions.push(login_optibin.loginWithEmptyUsername(credentials.password));
                arrayOfFunctions.push(login_optibin.loginWithEmptyPassword(credentials.user));
                arrayOfFunctions.push(login_optibin.loginWithEmptyCredentials());

                //Calling each of these functions and comfirming results.
                for (var key in arrayOfFunctions) {
                    arrayOfFunctions[key];

                    //Comfirm that the error message is displayed.
                    cy.get('.interact-identity-error-panel').contains('Your login details were not recognized. Please try again.');

                    //Comfirm that the user is not logged in.
                    cy.get('#username').should('have.attr', 'placeholder', 'Email');
                }

            }

        })

    })

})