# Running Cypress Tests
This project uses Cypress for end-to-end testing.

# Prerequisites
>- Make sure you have the following installed:

>- Node.js (v16 or later recommended)

>- npm

>- Cypress installed locally (npm install cypress --save-dev)

# Once repo is cloned in your local follow the next steps
>- cd your-repo
>- npm install

### Run tests - Cypress Dashboard in Production
> **`npm run open:prod`** — Opens the Cypress Dashboard using the production config file.

### Run tests - Terminal in Production
> **`npm run run:prod`** — Runs the Cypress tests using the production config file via terminal.

### Run tests - Cypress Dashboard in Stage
> **`npm run open:stage`** — Opens the Cypress Dashboard using the stage config file.

### Run tests - Terminal in Stage
> **`npm run run:stage`** — Runs the Cypress tests using the stage config file via terminal.

### Run tests - Via pipelines in gitlab

- Go to repository in gitlab
- Click **build** section in the left menu and got to **pipelines** section