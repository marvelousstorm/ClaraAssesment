import HomePage from "../../support/Pages/homePage";
import CartPage from "../../support/Pages/cartPage";
import FirstCheckoutPage from "../../support/Pages/firstCheckoutPage";
import SecondCheckoutPage from "../../support/Pages/secondCheckoutPage";

const homePage = new HomePage();
const cartPage = new CartPage();
const firstCheckoutPage = new FirstCheckoutPage();
const secondCheckoutPage = new SecondCheckoutPage();
let firstItem, secondItem, buyer, testD
const URL = Cypress.env('baseURL')
const username = Cypress.env('username')
const password = Cypress.env('password')
const env = Cypress.env('platform')
/* This funcion waits until sorting is completed, it checks that the first element text must not be equal after sorting,
    so once it is different it lets the program continue, if not, it will wait 500 ms to check again and will repeat 5 times*/
function waitUntilTitleChanges(titleBefore, interation = 0, maxIterations = 5) {
    if (interation >= maxIterations) return
    firstCheckoutPage.getTitle().invoke('text').then((titleAfter) => {
        if (titleBefore === titleAfter) {
            cy.wait(500)
            waitUntilTitleChanges(titleBefore, interation + 1, maxIterations)
        }
        else if (titleBefore !== titleAfter) {
            return
        }
    })
}
describe('Sorting home page tests', { tags: ['@smoke'] }, () => {
    before(() => {
        cy.fixture('purchaseItem.json').then((test_data) => {
            testD = (env === 'stage') ? test_data.stage : test_data.production
            firstItem = testD.firstItemToPurchase
            secondItem = testD.secondItemToPurchase
            buyer = testD.buyer
        })
    })
    beforeEach(() => {
        cy.login(URL, username, password)
    })

    it('Succesfully purchase more than one item"', { cases: [5] }, () => {
        homePage.getAddToCartButton(firstItem).scrollIntoView().should('be.visible').click()
        homePage.getAddToCartButton(secondItem).scrollIntoView().should('be.visible').click()
        homePage.getRemoveFromCartButton(firstItem).should('exist').and('be.visible').invoke('text').should('eq', 'Remove')
        homePage.getRemoveFromCartButton(secondItem).should('exist').and('be.visible').invoke('text').should('eq', 'Remove')
        homePage.getRemoveFromCartButton('').then((elements) => {
            homePage.getCartContainerCounter().invoke('text').should('eq', elements.length.toString())
        })
        homePage.getInventoryitemPrice(firstItem).invoke('text').then((itemPrice) => {
            cy.wrap(itemPrice).as('firstItemPrice')
        })
        homePage.getInventoryitemPrice(secondItem).invoke('text').then((itemPrice) => {
            cy.wrap(itemPrice).as('secondItemPrice')
        })
        homePage.getCartContainerCounter().click()
        cy.url().should('include', 'cart')
        cartPage.getTitle().should('be.visible').invoke('text').then((title) => {
            expect(title.trim()).to.eq('Your Cart')
        })
        cartPage.getCartItem(firstItem).should('exist').and('be.visible')
        cartPage.getCartItem(secondItem).should('exist').and('be.visible')
        cy.get('@firstItemPrice').then((firstItemPriceInHomePage) => {
            cartPage.getCartItemPrice(firstItem).invoke('text').then((firstItemPriceInCartPage) => {
                expect(firstItemPriceInCartPage).to.eq(firstItemPriceInHomePage)
            })
        })
        cy.get('@secondItemPrice').then((secondItemPriceInHomePage) => {
            cartPage.getCartItemPrice(secondItem).invoke('text').then((secondItemPriceInCartPage) => {
                expect(secondItemPriceInCartPage).to.eq(secondItemPriceInHomePage)
            })
        })
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
            waitUntilTitleChanges(titleBefore)
            firstCheckoutPage.getTitle().should('exist').and('be.visible').invoke('text').then((checkoutTitle) => {
                expect(checkoutTitle.trim()).to.include('Checkout: Overview')
            })
        })
        secondCheckoutPage.getItemInCart(firstItem).should('be.visible').invoke('text').then((firstItemInCart) => {
            expect(firstItemInCart).to.eq(firstItem)
        })
        cy.get('@firstItemPrice').then((firstItemPriceInHomePage) => {
            let firstPrice = firstItemPriceInHomePage.match(/\$([\d.,]+)/);
            if (firstPrice) {
                firstPrice = parseFloat(firstPrice[1].replace(',', ''));
            }
            secondCheckoutPage.getItemInCartPrice(firstItem).should('be.visible').invoke('text').then((firstItemInCartPrice) => {
                expect(firstItemPriceInHomePage).to.eq(firstItemInCartPrice)
            })
            cy.get('@secondItemPrice').then((secondItemPriceInHomePage) => {
                let secondPrice = secondItemPriceInHomePage.match(/\$([\d.,]+)/);
                if (secondPrice) {
                    secondPrice = parseFloat(secondPrice[1].replace(',', ''));
                }
                secondCheckoutPage.getItemInCartPrice(secondItem).should('be.visible').invoke('text').then((secondItemInCartPrice) => {
                    expect(secondItemPriceInHomePage).to.eq(secondItemInCartPrice)
                })
                secondCheckoutPage.getItemTotalLabel().invoke('text').then((totalItemPrice) => {
                    const match = totalItemPrice.match(/\$([\d.,]+)/);
                    if (match) {
                        const amount = parseFloat(match[1].replace(',', ''));
                        expect(amount).to.eq(firstPrice + secondPrice)
                    }
                })
                secondCheckoutPage.getTaxMount().invoke('text').then((tax) => {
                    let taxPrice = tax.match(/\$([\d.,]+)/);
                    if (taxPrice) {
                        taxPrice = parseFloat(taxPrice[1].replace(',', ''));
                    }
                    secondCheckoutPage.getTotalFee().invoke('text').then((total) => {
                        let totalFee= total.match(/\$([\d.,]+)/);
                        if (totalFee) {
                            totalFee = parseFloat(totalFee[1].replace(',', ''));
                            expect(totalFee).to.eq(firstPrice+secondPrice+taxPrice)
                        }
                    })
                })
            })
        })
        secondCheckoutPage.getFinishButton().should('be.visible').click()
    })
})