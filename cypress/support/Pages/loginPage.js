class LogInPage{
    getUsernameInput() {
        return cy.get('#user-name',{timeout:15000})
    }
    getPasswordInput() {
        return cy.get('#password',{timeout:15000})
    }
    getLogInButton() {
        return cy.get('#login-button',{timeout:15000})
    }
    getLoginErrorMessage() {
        return cy.get('h3[data-test="error"]',{timeout:15000})
    }
}
export default LogInPage