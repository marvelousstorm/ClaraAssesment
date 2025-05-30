import CartPage from "../../support/Pages/cartPage";
import FirstCheckoutPage from "../../support/Pages/firstCheckoutPage";
import SecondCheckoutPage from "../../support/Pages/secondCheckoutPage";
import FinishOrderPage from "../../support/Pages/finishOrderPage";

const cartPage = new CartPage();
const firstCheckoutPage = new FirstCheckoutPage();
const secondCheckoutPage = new SecondCheckoutPage();
const finishOrderPage = new FinishOrderPage();
let buyer, testD
let items = []
const URL = Cypress.env('baseURL')
const username = Cypress.env('username')
const password = Cypress.env('password')
const env = Cypress.env('platform')
/* This funcion waits until sorting is completed, it checks that the first element text must not be equal after sorting,
    so once it is different it lets the program continue, if not, it will wait 500 ms to check again and will repeat 5 times*/
// function waitUntilTitleChanges(titleBefore, interation = 0, maxIterations = 5) {
//     if (interation >= maxIterations) return
//     firstCheckoutPage.getTitle().invoke('text').then((titleAfter) => {
//         if (titleBefore === titleAfter) {
//             // cy.wait(500)
//             waitUntilTitleChanges(titleBefore, interation + 1, maxIterations)
//         }
//         else if (titleBefore !== titleAfter) {
//             return
//         }
//     })
// }
describe('Succesfully purchase', { tags: ['@smoke'] }, () => {
    before(() => {
        cy.fixture('purchaseItem.json').then((test_data) => {
            testD = (env === 'stage') ? test_data.stage : test_data.production
            items = testD.itemsPurchase
            buyer = testD.buyer
        })
    })
    beforeEach(() => {
        cy.login(URL, username, password)
    })

    it('Succesfully purchase more than one item"', { cases: [5] }, () => {
        cy.log('Adding items to cart: ' + items)
        cy.addItemsToCart(items)
        // Check otems in first checkout page
        cartPage.getCheckoutButton().should('be.visible').click()
        cy.url().should('contain', 'checkout')
        firstCheckoutPage.getTitle().should('exist').and('be.visible').invoke('text').then((checkoutTitle) => {
            expect(checkoutTitle.trim()).to.include('Checkout: Your Information')
        })
        firstCheckoutPage.getFirstNameInput().type(buyer.firstName)
        firstCheckoutPage.getLastNameInput().type(buyer.lastName)
        firstCheckoutPage.getZipInput().type(buyer.zip)
        firstCheckoutPage.getTitle().invoke('text').then((titleBefore) => {
            firstCheckoutPage.getContinueButton().should('be.visible').click()
            // waitUntilTitleChanges(titleBefore)
            firstCheckoutPage.getTitle().should('exist').and('be.visible').invoke('text').then((checkoutTitle) => {
                expect(checkoutTitle.trim()).to.include('Checkout: Overview')
            })
        })
        //Check if items selected are present in the checkout page
        let priceSum = 0
        cy.wrap(items).each((itemToPurchase, index) => {
            secondCheckoutPage.getItemInCart(itemToPurchase).should('be.visible').invoke('text').then((itemInCart) => {
                expect(items).to.include(itemInCart.trim())
            })
            cy.get('@itemPrices').then((itemPrices) => {
                let firstPrice = itemPrices[index].match(/\$([\d.,]+)/);
                if (firstPrice) {
                    firstPrice = parseFloat(firstPrice[1].replace(',', ''));
                    priceSum += firstPrice
                }
                secondCheckoutPage.getItemInCartPrice(itemToPurchase).should('be.visible').invoke('text').then((firstItemInCartPrice) => {
                    expect(itemPrices[index]).to.eq(firstItemInCartPrice)
                })
            })
        }).then(() => {
            cy.wrap(priceSum).as('priceSum')
            cy.log('Total price of items in cart: ' + priceSum)
            secondCheckoutPage.getItemTotalLabel().invoke('text').then((totalItemPrice) => {
                const match = totalItemPrice.match(/\$([\d.,]+)/);
                if (match) {
                    const amount = parseFloat(match[1].replace(',', ''));
                    expect(amount).to.eq(priceSum)
                }
            })
            secondCheckoutPage.getTaxMount().invoke('text').then((tax) => {
                let taxPrice = tax.match(/\$([\d.,]+)/);
                if (taxPrice) {
                    taxPrice = parseFloat(taxPrice[1].replace(',', ''));
                }
                secondCheckoutPage.getTotalFee().invoke('text').then((total) => {
                    let totalFee = total.match(/\$([\d.,]+)/);
                    if (totalFee) {
                        totalFee = parseFloat(totalFee[1].replace(',', ''));
                        expect(totalFee).to.eq(priceSum + taxPrice)
                    }
                })
            })
        })
        // Finish purchase
        secondCheckoutPage.getFinishButton().should('be.visible').click()
        cy.url().should('include', 'checkout-complete')
        firstCheckoutPage.getTitle().should('exist').and('be.visible').invoke('text').then((checkoutTitle) => {
            expect(checkoutTitle.trim()).to.include('Checkout: Complete!')
        })
        finishOrderPage.getSuccesfullPurchaseMessage().should('be.visible').invoke('text').then((sucessfullMessage) => {
            expect(sucessfullMessage).to.include('Thank you for your order!')
        })
    })
})