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
}
export default HomePage