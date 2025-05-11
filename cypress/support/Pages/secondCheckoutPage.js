class SecondCheckoutPage {
    getTitle() {
        return cy.get('.title', { timeout: 15000 })
    }
    getItemInCart(item) {
        return cy.get(`.cart_item:contains("${item}") a[id*="title"]`, { timeout: 15000 })
    }
    getItemInCartPrice(item) {
        return cy.get(`.cart_item:contains("${item}") .inventory_item_price`, { timeout: 15000 })
    }
    getItemTotalLabel() {
        return cy.get('.summary_subtotal_label', { timeout: 15000 })
    }
    getTaxMount() {
        return cy.get('.summary_tax_label', { timeout: 15000 })
    }
    getTotalFee() {
        return cy.get('.summary_total_label', { timeout: 15000 })
    }
    getFinishButton() {
        return cy.get('#finish', { timeout: 15000 })
    }
}
export default SecondCheckoutPage