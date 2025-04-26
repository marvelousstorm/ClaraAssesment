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
    getFailedLoginAlert() {
        return cy.get('div[data-cy="loginError"]',{timeout:15000})
    }
}
export default LogInPage