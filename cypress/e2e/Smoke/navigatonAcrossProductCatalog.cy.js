import HomePage from "../../support/Pages/homePage"

const homePage = new HomePage();
const URL=Cypress.env('baseURL')
const username = Cypress.env('username')
const password = Cypress.env('password')
/* This funcion waits until sorting is completed, it checks that the first element text must not be equal after sorting,
    so once it is different it lets the program continue, if not, it will wait 500 ms to check again and will repeat 5 times*/
function waitUntilSortingIsCompleted(itemBeforeSorting, interation = 0, maxIterations = 5) {
    if (interation >= maxIterations) return
    homePage.getProductNames().first().invoke('text').then((itemAfterSorting) => {
        if (itemBeforeSorting === itemAfterSorting) {
            cy.wait(500)
            waitUntilSortingIsCompleted(itemBeforeSorting, interation + 1, maxIterations)
        }
        else if (itemBeforeSorting !== itemAfterSorting) {
            return
        }
    })
}
describe('Sorting home page tests', { tags: ['@smoke']}, () => {
    beforeEach(() => {
        cy.login(URL, username, password)
    })

    it('Sort by name "Z to A" and "A to Z"', { cases: [3] }, () => {
        homePage.getProductsortContainer().should('be.visible').invoke('val').then((val) => {
            homePage.getProductNames().first().invoke('text').then((itemBeforeSorting) => {
                if (val !== 'az') {
                    homePage.getProductsortContainer().select('az')
                    waitUntilSortingIsCompleted(itemBeforeSorting)
                }
            })
        })
        let productNamesBeforeSorting = []
        cy.wrap(productNamesBeforeSorting).as('productNames')
        homePage.getProductNames().each((product) => {
            productNamesBeforeSorting.push(product.text())
        })
        //Sorting elements Z to A
        homePage.getProductNames().first().invoke('text').then((itemBeforeSorting) => {
            homePage.getProductsortContainer().select('za')
            waitUntilSortingIsCompleted(itemBeforeSorting)
        })
        let productNamesAfterSorting = []
        cy.wrap(productNamesAfterSorting).as('productNamesAfterSorting')
        homePage.getProductNames().each((product) => {
            productNamesAfterSorting.push(product.text())
        })
        cy.get('@productNames').then((productNames) => {
            cy.get('@productNamesAfterSorting').then((productNamesAfterSorting)=>{
                const productNamesSorted = [...productNames].sort((a, b) => b.localeCompare(a));
                expect(productNamesSorted).to.deep.equal(productNamesAfterSorting)
            })
        })
        //Sorting elements A to Z
        homePage.getProductNames().first().invoke('text').then((itemBeforeSorting) => {
            homePage.getProductsortContainer().select('az')
            waitUntilSortingIsCompleted(itemBeforeSorting)
            productNamesAfterSorting = []
        })
        homePage.getProductNames().each((product) => {
            productNamesAfterSorting.push(product.text())
        })
        cy.get('@productNames').then((productNamesBeforeSorting) => {
            cy.get('@productNamesAfterSorting').then((productNamesAfterSorting) => {
                cy.wrap(productNamesBeforeSorting).should('deep.equal',productNamesAfterSorting)
            })
        })
    })
    it('Sort by price "high to low" and "low to high"', { cases: [4] }, () => {
        homePage.getProductsortContainer().should('be.visible').invoke('val').then((val) => {
            homePage.getProductNames().first().invoke('text').then((itemBeforeSorting) => {
                if (val !== 'lohi') {
                    homePage.getProductsortContainer().select('lohi')
                    waitUntilSortingIsCompleted(itemBeforeSorting)
                }
            })
        })
        let pricesBeforeSorting = []
        cy.wrap(pricesBeforeSorting).as('productPrices')
        homePage.getInvetoryItemPrice().each((prices) => {
            pricesBeforeSorting.push(parseFloat(prices.text().replace(/[^0-9.]/g, '')))
        })
        //Sorting elements high price to low price
        homePage.getInvetoryItemPrice().first().invoke('text').then((itemBeforeSorting) => {
            homePage.getProductsortContainer().select('hilo')
            waitUntilSortingIsCompleted(itemBeforeSorting)
        })
        let productPricesAfterSorting = []
        cy.wrap(productPricesAfterSorting).as('productPricesAfterSorting')
        homePage.getInvetoryItemPrice().each((prices) => {
            productPricesAfterSorting.push(parseFloat(prices.text().replace(/[^0-9.]/g, '')))
        })
        cy.get('@productPrices').then((productPrices) => {
            cy.get('@productPricesAfterSorting').then((productPricesAfterSorting)=>{
                const productPricesSorted = [...productPrices].sort((a, b) => b - a);
                expect(productPricesSorted).to.deep.equal(productPricesAfterSorting)
            })
        })
        //Sorting elements low price to high price
        homePage.getInvetoryItemPrice().first().invoke('text').then((itemBeforeSorting) => {
            homePage.getProductsortContainer().select('lohi')
            waitUntilSortingIsCompleted(itemBeforeSorting)
            productPricesAfterSorting = []
        })
        homePage.getInvetoryItemPrice().each((prices) => {
            productPricesAfterSorting.push(parseFloat(prices.text().replace(/[^0-9.]/g, '')))
        })
        cy.get('@productPrices').then((productPrices) => {
            cy.get('@productPricesAfterSorting').then((productPricesAfterSorting) => {
                const productPricesSorted = [...productPrices].sort((a, b) => b - a);
                expect(productPricesSorted).to.deep.equal(productPricesAfterSorting)
            })
        })
    })
})