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

## Hints

Connect to database as user.

```bash
docker exec -it challenge-nodejs_mongo_1 mongo mongodb://127.0.0.1:27017/challenge -u user -p pass
```

Enjoy