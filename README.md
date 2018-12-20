# Node-express-boilerplate

This is the boilerplate of the node.js express app generated using https://github.com/fmvilas/swagger-node-codegen.

Feel free to make it up-to-dated and better.

---

## Proprosed code structure

```
|+ src/
 |+ libs/               // This folder contains libs, e.g., logger
 |+ middlewares/        // This folder contains middlewares
 |+ models/             // This folder contains models
 |+ routes/             // This folder contains routes and controllers
 |+ services/           // This folder contains services
 |- app.js              // Express app configuration here
 |- app.test.js         // Test file will have the same name with `.test.js` extension
 |- config.js           // Configuration file
|- .env                 // Environment variables
|- .eslintrc            // Lint configuration
|- .nycrc               // Code coverage configuration
|- .Dockerfile          // Dockerfile
|- mocha.opts           // Mocha test configuration
|- swagger.json         // Swagger file that describe project strcture
```

---

## Steps to generate app

Install `swagger-node-codegen` globally.

```
npm i snc -g
```

Generate project structure from the sample swagger file.

```
snc template/swagger.json -o ./my-express-api -t ./template/
```

---

## Steps to run the express app

Goto the express app

```
cd my-express-api
```

Install dependencies

```
npm i
```

Start the server

```
npm start
```

You should see the log like this

```
{"name":"swagger-petstore","hostname":"xxx,"pid":72556,"level":20,"msg":"Listening on port 3000","time":"2018-12-20T18:34:52.346Z","v":0}
```

The server will be start at the `3000` port (default port).

---

## Steps to call APIs

Open https://editor.swagger.io and copy `template/swagger.json ` and paste there.

Select `Schemes` to `HTTP`

Click 'Try it out' button at each APIs.

---

## How to run unit test and test coverage

Test coverage configuration is defined at `.nycrc`. You can adjust the threshold there.

To run unit test and test coverage, type

```
npm run cover
```
---

## How to run linter

This project is based on the airbnb style guide. You can read the document from https://github.com/airbnb/javascript

To run linter, type

```
npm run lint
```

---