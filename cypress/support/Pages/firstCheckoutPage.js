class FirstCheckoutPage {
    getTitle() {
        return cy.get('.title',{timeout:15000})
    }
    getFirstNameInput() {
        return cy.get('input[placeholder="First Name"]',{timeout:15000})
    }
    getLastNameInput() {
        return cy.get('input[placeholder="Last Name"]',{timeout:15000})
    }
    getZipInput() {
        return cy.get('input[placeholder="Zip/Postal Code"]',{timeout:15000})
    }
    getContinueButton() {
        return cy.get('#continue')
    }
}
export default FirstCheckoutPage