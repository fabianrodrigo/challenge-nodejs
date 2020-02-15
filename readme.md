# Challenge

Challenge is a NodeJS web service developed according to the provided specifications.

## Usage

Use the container solution [docker](https://www.docker.com/get-started) to install the app.

First start the mongodb server.

```bash
docker-compose up -d mongo
```

Then start the app:

```bash
docker-compose up --build challenge-nodejs
```

## Run tests

First start the mongodb server.

```bash
docker-compose up -d mongo
```

Then start the app in test app:

```bash
docker-compose up --build challenge-nodejs-test
```

## Hints

Connect to database as user.

```bash
docker exec -it challenge-nodejs_mongo_1 mongo mongodb://127.0.0.1:27017/challenge -u user -p pass
```

## Documentation

Click [here](https://fabianrodrigo.github.io/challenge-nodejs/) to read the api documentation generated with [Swagger](https://swagger.io/tools/swagger-ui/).

Click [here](https://raw.githubusercontent.com/fabianrodrigo/challenge-nodejs/master/doc.openapi3) to read the technical specifications OpenAPI 3.0.0 of the api.

Click [here](https://raw.githubusercontent.com/fabianrodrigo/challenge-nodejs/master/challenge-nodejs.postman_collection.json) to have the [Postman](https://www.postman.com/) configuration file for testing the API.

## Architecture

This is a list of different features:

### Modularity

The project was organized in two components: Orders and Articles. The modularity is important to be able to scale the architecture in the future, for example, splitting each component in different microservices.

### Decoupling

Each reference to o folder is always done to the index js file. The internal structure of the folder is private to the module.

### Dependency injection

The nodejs express server and app are generated using builders with dependency injections, to be able to define that set of dal classes will be used.

This feature allows to build a full coverage set of tests mocking the users and articles dals.

### Unit testing

The using testing was done using [Mocha](https://www.npmjs.com/package/mocha) and [Chai](https://www.npmjs.com/package/chai).

The tests are grouped in endpoint tests and db tests,

The endpoints tests covers the success use cases, and each possible error case, mocking the users and articles DALs.

The db tests covers all mongo db operations.

### Middleware

The token authentication, the error handling and also a future implementation of monitoring could be done using this pattern over the express app.

### API Validation

The server validates the endpoint request body using [Joi](https://github.com/hapijs/joi). Each endpoint is linked to a Joi schema.

### Logging

The project uses [Winston](https://www.npmjs.com/package/winston) to handle info and error logging across all nodejs files.

### High concurrency

A [Mongoose](https://www.npmjs.com/package/mongoose) connection pool is used to handle high request concurrency.
Also all enpoints works with asynchronous await/async architecture.

### Critic issues

The project is listening for unhandled exceptions and rejections to be able in the future to automate a notification delivery way to notify de admin.

Enjoy