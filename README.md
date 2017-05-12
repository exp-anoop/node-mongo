# ReST API starter using express, mongodb and apidoc

## Technology Stack
* Node 6.9.2
* Express 4.14.0
* MongoDB 3+

## Packages and tools used
* bcryptjs
* jsonwebtoken
* helmet
* lodash
* winston
* mocha
* supertest
* eslint
* apidoc

## Installation

* Clone the repo ``` git clone https://github.com/exp-anoop/node.git seed```.
* Install dependencies ```cd seed && rm -rf .git && yarn```.
* Run ```yarn run serve``` for starting the application (will check the code quality before starting the application).
* Run ```npm run build``` for run the tests and genarate apidoc.

## Core modifications
### Added two new functions to response object
1. res.return() - This function is a replacement for res.send(), using this function we include additional information to the response such as message, status and data.
  * Example ```res.return({name: "Anoop"}) // Output {"message":"OK","status":200, data: {name: "Anoop"}}```

2. res.message() - To send custom message along with the response, by default it will take standard http message.
  * Example 1: ```res.status(500).message("Some thing went wrong with the server").return() // Response {"message":"Some thing went wrong with the server","status":500}```
  * Example 2: ```res.status(500).return() // Response {"message":"Internal Server Error","status":500}```


## Demo Link
https://blooming-bayou-26551.herokuapp.com

## "Detailed documentation in progress, also share your valuable comments and features to be added to the seed"
