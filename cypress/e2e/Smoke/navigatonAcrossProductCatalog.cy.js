import { expect } from "chai";
import HomePage from "../../support/Pages/homePage"

const homePage = new HomePage();
const URL = Cypress.env('baseURL')
const username = Cypress.env('username')
const password = Cypress.env('password')

describe('Sorting home page tests', { tags: ['@smoke'] }, () => {
    beforeEach(() => {
        cy.login(URL, username, password)
    })

    it('Sort by name "Z to A" and "A to Z"', { cases: [3] }, () => {
        homePage.getProductsortContainer().should('be.visible').invoke('val').then((val) => {
            homePage.getProductNames().first().invoke('text').then((itemBeforeSorting) => {
                if (val !== 'az') {
                    homePage.getProductsortContainer().select('az')
                }
            })
        })
        let productNamesBeforeSorting = []
        homePage.getProductNames().each((product) => {
            productNamesBeforeSorting.push(product.text())
        }).then(() => {
            cy.wrap(productNamesBeforeSorting).as('productNames')
        })
        //Sorting elements Z to A
        homePage.getProductNames().first().invoke('text').then((itemBeforeSorting) => {
            homePage.getProductsortContainer().select('za')
        })
        let productNamesAfterSorting = []
        homePage.getProductNames().each((product) => {
            productNamesAfterSorting.push(product.text())
        }).then(() => {
            cy.get('@productNames').then((productNames) => {
                const productNamesSorted = [...productNames].sort((a, b) => b.localeCompare(a));
                expect(productNamesSorted).to.deep.equal(productNamesAfterSorting)
            })
        })
        //Sorting elements A to Z
        homePage.getProductNames().first().invoke('text').then((itemBeforeSorting) => {
            homePage.getProductsortContainer().select('az')
            productNamesAfterSorting = []
        })
        homePage.getProductNames().each((product) => {
            productNamesAfterSorting.push(product.text())
        }).then(() => {
            cy.get('@productNames').then((productNames) => {
                const productNamesSorted = [...productNames].sort((a, b) => a.localeCompare(b));
                expect(productNamesSorted).to.deep.equal(productNamesAfterSorting)
            })
        })
    })
    it('Sort by price "high to low" and "low to high"', { cases: [4] }, () => {
        homePage.getProductsortContainer().should('be.visible').invoke('val').then((val) => {
            homePage.getProductNames().first().invoke('text').then((itemBeforeSorting) => {
                if (val !== 'lohi') {
                    homePage.getProductsortContainer().select('lohi')
                }
            })
        })
        let pricesBeforeSorting = []
        homePage.getInvetoryItemPrice().each((prices) => {
            pricesBeforeSorting.push(parseFloat(prices.text().replace(/[^0-9.]/g, '')))
        }).then(() => {
            cy.wrap(pricesBeforeSorting).as('productPrices')
        })
        //Sorting elements high price to low price
        homePage.getInvetoryItemPrice().first().invoke('text').then((itemBeforeSorting) => {
            homePage.getProductsortContainer().select('hilo')
        })
        let productPricesAfterSorting = []
        homePage.getInvetoryItemPrice().each((prices) => {
            productPricesAfterSorting.push(parseFloat(prices.text().replace(/[^0-9.]/g, '')))
        }).then(() => {
            cy.get('@productPrices').then((productPrices) => {
                const productPricesSorted = [...productPrices].sort((a, b) => b - a);
                expect(productPricesSorted).to.deep.equal(productPricesAfterSorting)
            })
        })
        //Sorting elements low price to high price
        homePage.getInvetoryItemPrice().first().invoke('text').then((itemBeforeSorting) => {
            homePage.getProductsortContainer().select('lohi')
            productPricesAfterSorting = []
        })
        homePage.getInvetoryItemPrice().each((prices) => {
            productPricesAfterSorting.push(parseFloat(prices.text().replace(/[^0-9.]/g, '')))
        }).then(() => {
            cy.get('@productPrices').then((productPrices) => {
                const productPricesSorted = [...productPrices].sort((a, b) => a - b);
                expect(productPricesSorted).to.deep.equal(productPricesAfterSorting)

            })
        })
    })
})