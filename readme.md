# Challenge

Challenge is a NodeJS library for developing a web service.

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

Enjoy