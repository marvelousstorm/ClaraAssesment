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

1. Go to repository in gitlab
2. Click **build** section in the left menu and got to **pipelines** section
3. Click **New pipeline** button
4. Select branch where you want to run the pipeline, dafault value is **master**
5. You will see a **Variables** section
    - You can leave it blank if you ant to run entire **smoke** suite in **production** environment
    - If you want to run another suite in prod, add the suite path to **gitlab** folder on **prod** config file or check of the suite you want alrady is added.
    - Once the path is in **prod** config file, return to gitlab and add a vriable with key **SUITE_NAME** and in value put exactly the same name you put to the suite in **prod** config file.