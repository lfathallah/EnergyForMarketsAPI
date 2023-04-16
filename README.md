![Generic badge](https://img.shields.io/badge/node-v18-blue.svg)


# Energy for Markets

This is an API dedicated for energy aggregators which exposes endpoints to :
- create a new energy parc
- create a new offer and its time blocks
- display all markets and their offers
- display all parks that sell on a given market (TODO)

This project is a nodejs application that is packaged into a Docker image and deployed in a ECS instance in AWS. 

This application also embeds OpenApi specification in order to use its endpoints

Please take a look on the technical environment specification below.

# Requirements
- NodeJs 18
- Docker
- Jasmine (for running tests) : install with the following command
```sh
$ npm install -g jasmin
```

# Run
## 1- Run from local server
   There are two options to run the application on local server (localhost).

### Manual run

- run the following commands on the terminal

```sh
$ npm install 

$ npm start
```

- open the http://localhost:3000/api-docs/ to test the endpoints on Swagger

### Docker run

- Install the docker engine on your machine (depending on your machine's OS). Installation details => https://docs.docker.com/engine/install/
- Run the start.sh script located at the root of the project
```sh
$ ./start.sh (or sh start.sh)
```
- open the http://localhost:3000/api-docs/ to test the endpoints on Swagger


## 2- Run from ECS

The ECS instance is already up. You only need to open the following URL : http://13.39.166.13:3000/api-docs

# Run unit tests
You can either run the test from terminal with the following command :
- to run all tests
```sh
$ jasmine
```
- to run a specific test file
```sh
$ jasmine --specs <dir>/<filetest.js>
```
or by executing the npm command

```sh
$ npm test
```

# Technical Environment Specification
- Docker Engine
- Node: 18.15.0
