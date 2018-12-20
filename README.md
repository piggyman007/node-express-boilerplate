# nodejs-restapi-boilerplate

This is the boilerplate express rest-api using `https://github.com/fmvilas/swagger-node-codegen`, but re-structure the template.

---

## code structure

```
|- index.js            // This file still contains static code like before.
|+ api/
 |- index.js           // This file will now e.g. have included the two files in routes.
 |+ routes/
  |- pet.route.js      // This file contains the code for methods on pets. 
  |                    // (e.g. getPet, postPet, getPetByPetId). 
  |- user.route.js     // This file will contain the code for methods on users. 
                       // (e.g. postUserLogin, getUserByUsername, putUserByUsername, deleteUserByUsername). 
```

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