class CartPage {
    getTitle() {
        return cy.get('.title',{timeout:15000})
    }
    getCartItem(item) {
        return cy.get(`.cart_item:contains("${item}")`,{timeout:15000})
    }
    getCartItemPrice(item) {
        return cy.get(`.cart_item:contains("${item}") .inventory_item_price`,{timeout:15000})
    }
    getCheckoutButton() {
        return cy.get('#checkout',{timeout:15000})
    }
}
export default CartPage