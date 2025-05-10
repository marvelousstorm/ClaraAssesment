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
    bubbleSortNumerical(arr) {
        let n = arr.length;
        let swapped;

        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                if (arr[i] < arr[i + 1]) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    swapped = true;
                }
            }
            n--;
        } while (swapped);
        return arr;
    }
    bubbleSortAlphabetical(arr) {
        let n = arr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                if (arr[i].localeCompare(arr[i + 1]) < 0) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    swapped = true;
                }
            }
            n--;
        } while (swapped);

        return arr;
    }
}
export default HomePage