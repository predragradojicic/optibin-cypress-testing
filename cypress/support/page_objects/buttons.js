
class Button {

    // Testing arrows for increasing and decreasing values in input fields.
    static Run() {
        return cy.contains('button', 'Run');
    }

    static Reset() {
        return cy.contains('button', 'Reset');
    }

    static Upload() {
        return cy.contains('button', 'Upload');
    }

    static Download() {
        return cy.contains('button', 'Download');
    }

    static Save() {
        return cy.contains('button', 'Save');
    }

    static Cancel() {
        return cy.contains('button', 'Cancel');
    }

    static Export() {
        return cy.contains('button', 'Export');
    }

    static Finish() {
        return cy.contains('button', 'Finish');
    }
}
  
export default Button;
