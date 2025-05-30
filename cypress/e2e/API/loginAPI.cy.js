const URL = Cypress.env('apiURL')
const env = Cypress.env('platform')
let email,password
describe('Login API', { tags: ['@smoke', '@API'] }, () => {
    before(() => {
        cy.fixture('API_test_data.json').then((test_data) => {
            let testD = (env === 'stage') ? test_data.stage.loginAPI : test_data.production.loginAPI
            email = testD.email
            password = testD.password
        })
    })

    it('Succesfull login', { cases: [2] }, () => {
        cy.request({
            method: 'POST',
            url: `${URL}login`,
            body: {
                "email": email,
                "password": password
            },
            headers: {
                'Content-type': 'application/json',
                'x-api-key': Cypress.env('apiKey')
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
            cy.log(response.body.token)
        });
    })
     it('Login with wrong username and password', { cases: [3] }, () => {
        cy.request({
            method: 'POST',
            url: `${URL}login`,
            failOnStatusCode: false, 
            body: {
                "email": "wrongUsername",
                "password": "wrongPassword"
            },
            headers: {
                'Content-type': 'application/json',
                'x-api-key': Cypress.env('apiKey')
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.eq('user not found');
        });
    })
})