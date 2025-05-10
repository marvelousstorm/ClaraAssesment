import HomePage from "../../support/Pages/homePage"

const homePage = new HomePage();
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
function bubbleSortAlphabetical(arr) {
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
describe('Login tests', { tags: ['@smoke'], cases: [1] }, () => {
    beforeEach(() => {
        cy.login(Cypress.env('baseURL'), Cypress.env('username'), Cypress.env('password'))
    })

    it('Sort by name "Z to A" and "A to Z"', { cases: [1] }, () => {
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
            let productNamesSorted = bubbleSortAlphabetical(productNames)
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
    it.only('Sort by price "high to low" and "low to high"', { cases: [1] }, () => {
        homePage.getProductsortContainer().should('be.visible').invoke('val').then((val) => {
            homePage.getProductNames().first().invoke('text').then((itemBeforeSorting) => {
                if (val !== 'lohi') {
                    homePage.getProductsortContainer().select('lohi')
                    waitUntilSortingIsCompleted(itemBeforeSorting)
                }
            })
        })
        let productNamesBeforeSorting = []
        cy.wrap(productNamesBeforeSorting).as('productNames')
        homePage.getInvetoryItemPrice().each((product) => {
            productNamesBeforeSorting.push(product.text())
        })
        cy.get('@productNames').then((productNames) => {
            let productNamesSorted = cy.numericalBubbleSort(productNames)
            cy.wrap(productNamesSorted).as('productNamesSorted')
        })
        //Sorting elements Z to A
        homePage.getInvetoryItemPrice().first().invoke('text').then((itemBeforeSorting) => {
            homePage.getProductsortContainer().select('hilo')
            waitUntilSortingIsCompleted(itemBeforeSorting)
        })
        let productNamesAfterSorting = []
        cy.wrap(productNamesAfterSorting).as('productNamesAfterSorting')
        homePage.getInvetoryItemPrice().each((product) => {
            productNamesAfterSorting.push(product.text())
        })
        cy.get('@productNamesSorted').then((productNamesSorted) => {
            cy.get('@productNamesAfterSorting').then((productNamesAfterSorting)=>{
                cy.wrap(productNamesSorted).should('deep.equal',productNamesAfterSorting)
            })
        })
        //Sorting elements A to Z
        homePage.getInvetoryItemPrice().first().invoke('text').then((itemBeforeSorting) => {
            homePage.getProductsortContainer().select('lohi')
            waitUntilSortingIsCompleted(itemBeforeSorting)
            productNamesAfterSorting = []
        })
        homePage.getInvetoryItemPrice().each((product) => {
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
})