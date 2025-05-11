import HomePage from "../../support/Pages/homePage"

const homePage = new HomePage();
let item, testD
const URL=Cypress.env('baseURL')
const username = Cypress.env('username')
const password = Cypress.env('password')
const env = Cypress.env('platform')
describe('Sorting home page tests', { tags: ['@smoke']}, () => {
    before (()=>{
        cy.fixture('purchaseItem.json').then((test_data)=>{
            testD = (env === 'stage') ? test_data.stage : test_data.production
            item=testD.itemToPurchase
        })
    })
    beforeEach(() => {
        cy.login(URL, username, password)
    })

    it('Succesfully purchase an item"', { cases: [5] }, () => {
        homePage.getAddToCartButton(item).should('be.visible').click()

    })
})