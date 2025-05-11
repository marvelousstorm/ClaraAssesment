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
        cy.get('@productNames').then((productNames) => {
            let productNamesSorted = homePage.bubbleSortAlphabetical(productNames)
            cy.wrap(productNamesSorted).as('productNamesSorted')
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
        cy.get('@productNamesSorted').then((productNamesSorted) => {
            cy.get('@productNamesAfterSorting').then((productNamesAfterSorting)=>{
                cy.wrap(productNamesSorted).should('deep.equal',productNamesAfterSorting)
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
                for(let i= 0;i<productNamesAfterSorting.length;i++){
                    cy.log(productNamesAfterSorting[i])
                }
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
        cy.get('@productPrices').then((productPrices) => {
            let productPricesSorted = homePage.bubbleSortNumerical(productPrices)
            cy.wrap(productPricesSorted).as('productPricesSorted')
        })
    //     //Sorting elements Z to A
        homePage.getInvetoryItemPrice().first().invoke('text').then((itemBeforeSorting) => {
            homePage.getProductsortContainer().select('hilo')
            waitUntilSortingIsCompleted(itemBeforeSorting)
        })
        let productPricesAfterSorting = []
        cy.wrap(productPricesAfterSorting).as('productPricesAfterSorting')
        homePage.getInvetoryItemPrice().each((prices) => {
            productPricesAfterSorting.push(parseFloat(prices.text().replace(/[^0-9.]/g, '')))
        })
        cy.get('@productPricesSorted').then((productPricesSorted) => {
            cy.get('@productPricesAfterSorting').then((productPricesAfterSorting)=>{
                cy.wrap(productPricesSorted).should('deep.equal',productPricesAfterSorting)
            })
        })
    //     //Sorting elements A to Z
        homePage.getInvetoryItemPrice().first().invoke('text').then((itemBeforeSorting) => {
            homePage.getProductsortContainer().select('lohi')
            waitUntilSortingIsCompleted(itemBeforeSorting)
            productPricesAfterSorting = []
        })
        homePage.getInvetoryItemPrice().each((prices) => {
            productPricesAfterSorting.push(parseFloat(prices.text().replace(/[^0-9.]/g, '')))
        })
        cy.get('@productPrices').then((pricesBeforeSorting) => {
            cy.get('@productPricesAfterSorting').then((productPricesAfterSorting) => {
                for(let i= 0;i<productPricesAfterSorting.length;i++){
                    cy.log(productPricesAfterSorting[i])
                }
                cy.wrap(pricesBeforeSorting).should('deep.equal',productPricesAfterSorting)
            })
        })
    })
})