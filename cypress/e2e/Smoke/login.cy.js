import LogInPage from "../../support/Pages/loginPage"
import HomePage from "../../support/Pages/homePage"

const loginPage = new LogInPage()
const homePage = new HomePage()
describe('Login tests', { tags: ['@smoke'], cases: [1] }, () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseURL'))
    })

    it('Valid login', {cases: [1] }, () => {
        loginPage.getUsernameInput().should('be.visible').type(Cypress.env('username'));
        loginPage.getPasswordInput().should('be.visible').type(Cypress.env('password'));
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
    it('Invalid login', {cases: [2] }, () => {
        loginPage.getUsernameInput().should('be.visible').type('wrongUsername');
        loginPage.getPasswordInput().should('be.visible').type('wrongPassword');
        loginPage.getLogInButton().should('be.visible').click();
        loginPage.getLoginErrorMessage().should('be.visible').and('exist').invoke('text').then((failedLoginText) => {
            expect(failedLoginText.trim()).to.contain('Epic sadface: Username and password do not match any user in this service')
        })
    })
})