import LogInPage from "./Pages/loginPage";
import HomePage from "./Pages/homePage";
import CartPage from "./Pages/cartPage";

Cypress.Commands.add("login", function (url, username, password) {
    const loginPage = new LogInPage()
    const homePage = new HomePage()
    cy.visit(url)
    // cy.intercept('','/api/Login').as('loginAPI')
    loginPage.getUsernameInput().should('be.visible').type(username);
    loginPage.getPasswordInput().should('be.visible').type(password);
    loginPage.getLogInButton().should('be.visible').click();
    // cy.wait('@loginAPI').its('response.statusCode').should('eq',200)
    homePage.getHeader().should('be.visible').and('exist').invoke('text').then((titleText) => {
        expect(titleText.trim()).to.include('Swag Labs')
    })
    homePage.getTitle().should('be.visible').and('exist').invoke('text').then((titleText) => {
        expect(titleText.trim()).to.include('Products')
    })
    homePage.getShoppingCartIcon().should('exist').and('be.visible')
    homePage.getProductsortContainer().should('exist').and('be.visible')
})

Cypress.Commands.add("addItemsToCart", function (items) {
    const homePage = new HomePage()
    const cartPage = new CartPage()
    let prices = []
    cy.wrap(items).each((itemToPurchase) => {
        homePage.getAddToCartButton(itemToPurchase).scrollIntoView().should('be.visible').click()
        homePage.getRemoveFromCartButton(itemToPurchase).should('exist').and('be.visible').invoke('text').should('eq', 'Remove')
        homePage.getInventoryitemPrice(itemToPurchase).invoke('text').then((itemPrice) => {
            prices.push(itemPrice)
        })
    }).then(() => {
        // Store item prices array in a Cypress alias for later use
        cy.wrap(prices).as('itemPrices')
    })
    homePage.getRemoveFromCartButton('').then((elements) => {
        homePage.getCartContainerCounter().invoke('text').should('eq', elements.length.toString())
    })
    // Go to cart page
    homePage.getCartContainerCounter().click()
    cartPage.getTitle().should('be.visible').invoke('text').then((title) => {
        expect(title.trim()).to.eq('Your Cart')
    })
    // Verify items in cart and verify if items prices in home page and cart page are the same
    cy.get('@itemPrices').then((itemPrices) => {
        cy.wrap(items).each((itemToPurchase,index) => {
            cartPage.getCartItem(itemToPurchase).should('exist').and('be.visible')
            cartPage.getCartItemPrice(itemToPurchase).invoke('text').then((itemPriceInCart) => {
                expect(itemPriceInCart).to.eq(itemPrices[index])
            })
        })
    })
})