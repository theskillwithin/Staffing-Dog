## Local Development

Local dev depends on this repo (sdog-app) and the api server (sdog). Below are instructions on getting the sdog-app up and running.

### What is used for local development

- Yarn for package management and script running
- NVM for node versioning
- Eslint & Prettier for linting and automatic syntax.
- Webpack & Babel for packing and transpiling code

### Install Yarn

Using brew, install yarn. `brew install yarn`

### Install Dependencies

Using yarn, run `yarn` to install all dependencies.

### Start the server

To start the server, run `yarn start`. This starts up a local FE server at http://localhost:8080

## Basic Understanding of App Structure

- /src (holds all user facing code)
  - /components (holds all common components shared through the app)
  - /scenes (holds entry points / routes -- think main sections of the site)
  - /store (holds all global redux actions, reducers and api calls)
  - /utils (holds common used utility functions)

## Basic Understanding of App Tech

- CSS Modules (keep styles close to the components)
- ES6 + JSX
- React.lazy for lazy-loading & code-splitting
- React.Suspense for helping the ui with lazy-loading
- Cypress for e2e testing

## Todo's

- react-testing-library for unit tests
- reach-router for routing instead of react-router-dom
- parceljs instead of webpack (possibly)
- rewrite onboarding flow (it is a mess)
