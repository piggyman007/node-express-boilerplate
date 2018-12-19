# nodejs-restapi-boilerplate

This is the boilerplate express rest-api using `https://github.com/fmvilas/swagger-node-codegen`, but re-structure the template.

---

## code structure

N/A

---

## steps to run

Install `swagger-node-codegen` globally.

```
npm i snc -g
```

Generate project structure from the sample swagger file.

```
snc sample-swagger.yaml -o ./my-express-api -t ./template/
```

---