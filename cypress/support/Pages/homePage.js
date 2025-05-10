class HomePage{
    getHeader() {
        return cy.get('.app_logo',{timeout:15000})
    }
    getTitle() {
        return cy.get('.title',{timeout:15000})
    }
    getShoppingCartIcon() {
        return cy.get('.shopping_cart_link',{timeout:15000})
    }
    getProductsortContainer() {
        return cy.get('.product_sort_container',{timeout:15000})
    }
    getProductNames() {
        return cy.get('div[data-test="inventory-item-name"]',{timeout:15000})
    }
    getInvetoryItemPrice() {
        return cy.get('.inventory_item_price',{timeout:15000})
    }
}
export default HomePage