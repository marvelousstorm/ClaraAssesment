import HomePage from "../../support/Pages/homePage"
import CartPage from "../../support/Pages/cartPage";

const homePage = new HomePage();
const cartPage = new CartPage();
let firstItem, secondItem, testD
const URL=Cypress.env('baseURL')
const username = Cypress.env('username')
const password = Cypress.env('password')
const env = Cypress.env('platform')
describe('Sorting home page tests', { tags: ['@smoke']}, () => {
    before (()=>{
        cy.fixture('purchaseItem.json').then((test_data)=>{
            testD = (env === 'stage') ? test_data.stage : test_data.production
            firstItem=testD.firstItemToPurchase
            secondItem=testD.secondItemToPurchase

        })
    })
    beforeEach(() => {
        cy.login(URL, username, password)
    })

    it('Succesfully purchase more than one item"', { cases: [5] }, () => {
        homePage.getAddToCartButton(firstItem).scrollIntoView().should('be.visible').click()
        homePage.getAddToCartButton(secondItem).scrollIntoView().should('be.visible').click()
        homePage.getRemoveFromCartButton(firstItem).should('exist').and('be.visible').invoke('text').should('eq','Remove')
        homePage.getRemoveFromCartButton(secondItem).should('exist').and('be.visible').invoke('text').should('eq','Remove')
        homePage.getRemoveFromCartButton('').then((elements)=>{
            homePage.getCartContainerCounter().invoke('text').should('eq',elements.length.toString())
        })
        homePage.getInventoryitemPrice(firstItem).invoke('text').then((itemPrice)=>{
            cy.wrap(itemPrice).as('firstItemPrice')
        })
        homePage.getInventoryitemPrice(secondItem).invoke('text').then((itemPrice)=>{
            cy.wrap(itemPrice).as('secondItemPrice')
        })
        homePage.getCartContainerCounter().click()
        cy.url().should('include','cart')
        cartPage.getTitle().should('be.visible').invoke('text').then((title)=>{
            expect(title.trim()).to.eq('Your Cart')
        })
        cartPage.getCartItem(firstItem).should('exist').and('be.visible')
        cartPage.getCartItem(secondItem).should('exist').and('be.visible')
        cy.get('@firstItemPrice').then((firstItemPriceInHomePage)=>{
            cartPage.getCartItemPrice(firstItem).invoke('text').then((firstItemPriceInCartPage)=>{
                expect(firstItemPriceInCartPage).to.eq(firstItemPriceInHomePage)
            })
        })
        cy.get('@secondItemPrice').then((secondItemPriceInHomePage)=>{
            cartPage.getCartItemPrice(secondItem).invoke('text').then((secondItemPriceInCartPage)=>{
                expect(secondItemPriceInCartPage).to.eq(secondItemPriceInHomePage)
            })
        })
        cartPage.getCheckoutButton().should('be.visible').click()
    })
})