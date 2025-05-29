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
> **`npm run run:prodUI`** — Runs the Cypress UI tests using the production config file via terminal.

> **`npm run run:prodAPI`** — Runs the Cypress API tests using the production config file via terminal.

### Run tests - Cypress Dashboard in Stage
> **`npm run open:stage`** — Opens the Cypress Dashboard using the stage config file.

### Run tests - Terminal in Stage
> **`npm run run:stageUI`** — Runs the Cypress UI tests using the stage config file via terminal.

> **`npm run run:stageAPI`** — Runs the Cypress API tests using the stage config file via terminal.

### Run tests - Via pipelines in github workflows

1. Go to repository in github
2. Click **Actions** section in the top menu
3. In the left menu you will see **Run Cypress Tests** worflow, make click on it
4. You will see **Run workflow** dropdown, click on it
5. Branch **master** will be selected as default in Branch dropdown, but you can select the branch you want to run
6. Below you will see **Suite to run** dropdown, select the suite you want to run, currently options are SMOKEUI or API
7. Then you will see **Environemt to run** dropdown, you can choose between stage or prod
8. Once all of these variables are set, you can click **Run workflow**
9. You can add more suites in **test-suites-[ENV].yml** files, just you need to update **cypress.yml** and add suite name under workflow_dispatch > inputs > suite_name > options following the same syntax