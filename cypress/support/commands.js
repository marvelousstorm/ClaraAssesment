import LogInPage from "./Pages/loginPage";
import HomePage from "./Pages/homePage";

Cypress.Commands.add("login", function (url, username, password) {
    const loginPage = new LogInPage()
    const homePage = new HomePage()
    cy.visit(url)
    loginPage.getUsernameInput().should('be.visible').type(username);
    loginPage.getPasswordInput().should('be.visible').type(password);
    loginPage.getLogInButton().should('be.visible').click();
    homePage.getHeader().should('be.visible').and('exist').invoke('text').then((titleText) => {
        expect(titleText.trim()).to.include('Swag Labs')
    })
    homePage.getTitle().should('be.visible').and('exist').invoke('text').then((titleText) => {
        expect(titleText.trim()).to.include('Products')
    })
    homePage.getShoppingCartIcon().should('exist').and('be.visible')
    homePage.getProductsortContainer().should('exist').and('be.visible')
})