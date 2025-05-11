class FinishOrderPage {
    getTitle() {
        return cy.get('.title',{timeout:15000})
    }
    getSuccesfullPurchaseMessage() {
        return cy.get('.complete-header',{timeout:15000})
    }
}
export default FinishOrderPage