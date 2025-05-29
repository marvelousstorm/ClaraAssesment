class HomePage {
    getHeader() {
        return cy.get('.app_logo', { timeout: 15000 })
    }
    getTitle() {
        return cy.get('.title', { timeout: 15000 })
    }
    getShoppingCartIcon() {
        return cy.get('.shopping_cart_link', { timeout: 15000 })
    }
    getProductsortContainer() {
        return cy.get('.product_sort_container', { timeout: 15000 })
    }
    getProductNames() {
        return cy.get('div[data-test="inventory-item-name"]', { timeout: 15000 })
    }
    getInvetoryItemPrice() {
        return cy.get('.inventory_item_price', { timeout: 15000 })
    }
    getAddToCartButton(item) {
        return cy.get(`div.inventory_item_description:contains("${item}") button[id^="add-to-cart-sauce-labs"]`, { timeout: 15000 })
    }
    getRemoveFromCartButton(item) {
        return cy.get(`div.inventory_item_description:contains("${item}") button[id^="remove-sauce-labs"]`, { timeout: 15000 })
    }
    getInventoryitemPrice(item) {
        return cy.get(`div.inventory_item_description:contains("${item}") .inventory_item_price`, { timeout: 15000 })
    }
    getCartContainerCounter() {
        return cy.get('#shopping_cart_container span', { timeout: 15000 })
    }
}
export default HomePage