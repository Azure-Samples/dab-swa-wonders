# Wonders App With Data API Builder

A sample JAMstack application of Static Web Apps with Database Connections backed by Data API Builder for an Angular Application with Azure Cosmos DB (NOSQL API) as a database

## Features

This project uses the Data API Builder integrated with Static Web Apps to provide the following functionality:

- CRUD access to database contents with GraphQL
- Built-in authorization with Static Web Apps authentication

## Getting Started

### Prerequisites

1. An Azure Cosmos DB Account (NOSQL API) with collection created
2. Latest NodeJS and NPM installed
3. Visual Studio Coede
4. An Azure Static Web App resource

### Installation

1. Clone this repository
2. Navigate to `root` directory & open with VSCode
3. Set the `DATABASE_CONNECTION_STRING` environment variable to your connection string in your terminal/cmd/powershell. Alternatively, paste your database connection string directly into `swa-db-connections/staticwebapp.database.config.json` (_not recommended_) (ensure that you remove this secret from your source code before pushing to GitHub/remote repository)
4. Run `swa start http://localhost:4200 -db swa-db-connections --run "npm i && ng serve"`
   _ `npm i && npm start` will install needed npm packages and run your Angular app
   _ `--data-api-location swa-db-connections` indicates to the SWA CLI that your database connections configurations are in the `swa-db-connections` folder
   Alternatively, you can start all these projects manually an make use of SWA CLI's other args

You can now use your Wonders Demo Application. It supports authorization, such that anyone logged in with SWA CLI's authentication emulation with the `anonymous` role will have `CRUD` access. See the configurations detailed in `staticwebapp.database.config.json`

### To deploy

1. Commit all your changes and push to your repository.
   - You do not need to change your configuration file's `data-source` object, since this will be overwritten by your Static Web App resource when you connect a database.
   - (If you have paste your connection string directly in your configuration file, ensure that you remove it to avoid making your database connection string public)
2. Go to your Static Web App resource in the portal. Go to the Database connection tab.
3. Ensure that your database is ready for connection. It should be configured to accept network requests from Azure services. If you plan to use managed identity as a connection type, ensure that you've configured the managed identity within your database.
4. Link your database to your default environment. Select your database & enter the credentials.

### Troubleshooting

- Ensure your Cosmos DB Account is configured to accept network requests
- Ensure that your configuration files have been placed in your repository and included in your build process.
- Ensure that your managed identity has been configured within your database.

## Screenshots

### Home page:

![alt text](./.readme/mainpage.png)

### Non-logged in users receive 403's when they try to Create as configured in `swa-db-connections/staticwebapp.database.config.json`

![alt text](./.readme/anonuserscreate.png)

### Non-logged in users receive 403's when they try to Delete as configured in `swa-db-connections/staticwebapp.database.config.json`

![alt text](./.readme/anonusersdelete.png)

### Log in page with `admin` role

![alt text](./.readme/authpage.png)

### Non-logged in users receive succesful 201's when they try to Create as configured in `swa-db-connections/staticwebapp.database.config.json`![alt text](./.readme/adminuserscreate.png)
