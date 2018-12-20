# nodejs-restapi-boilerplate

This is the boilerplate express rest-api using `https://github.com/fmvilas/swagger-node-codegen`, but re-structure the template.

---

## proprosed code structure

```
|+ src/
 |+ controllers/        // This folder contains controllers
 |+ libs/               // This folder contains libs, e.g., logger
 |+ middlewares/        // This folder contains middlewares
 |+ models/             // This folder contains models
 |+ services/           // This folder contains services
 |- config.js           // Configuration file
 |- routes.js           // All routes are defined here
 |- routes.test.js      // Test file will have the same name with `.test.js` extension
|- .env                 // Environment variables
|- .Dockerfile          // Dockerfile
```

---

## steps to run

Install `swagger-node-codegen` globally.

```
npm i snc -g
```

Generate project structure from the sample swagger file.

```
snc template/swagger.json -o ./my-express-api -t ./template/
```

---