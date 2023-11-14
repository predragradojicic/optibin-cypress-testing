
//Class for logging in Optibin.
class LoginOptibin{
    
    //Object with keys and values. A key has a function as a value.
    loginElements = {
        username : () => cy.get('#username'),
        password : () => cy.get('#password'),
        loginButton : () => cy.get('.interact-identity-main-button').contains('Log in')
    }

    //Function 'typeUsername' gets the parameter 'username' from login-to-optibin.cy.js.
    typeUsername(username) {
        this.loginElements.username().clear().type(username);
    }

    typePassword(password) {
        this.loginElements.password().clear().type(password);
    }

    clickLogin() {
        this.loginElements.loginButton().click();
    }

    loginWithEmptyUsername(password) {
        this.loginElements.username().clear()
        this.loginElements.password().clear().type(password);
        this.loginElements.loginButton().click();
    }

    loginWithEmptyPassword(username) {
        this.loginElements.username().clear().type(username);
        this.loginElements.password().clear()
        this.loginElements.loginButton().click();
    }

    loginWithEmptyCredentials() {
        this.loginElements.username().clear()
        this.loginElements.password().clear()
        this.loginElements.loginButton().click();
    }
    
}

export default LoginOptibin