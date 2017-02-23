# ReST API starter using express, mongodb and apidoc

## Technology Stack
* Node 6.9.2
* Express 4.14.0
* MongoDB 3+

## Installation

* Clone the repo ``` git clone https://github.com/exp-anoop/node.git```
* Install dependencies ```cd node && npm install```
* Run ```npm start``` for starting the application
* Run ```npm apidoc``` for genarate API documentation

## Core modifications
### Added two new functions to response object
* res.message() - To send custom message along with the response, by default it will take standard http message.
** Example 1: ```res.status(500).message("Some thing went wrong with the server").return() // Response {"message":"Some thing went wrong with the server","status":500}```
** Example 2: ```res.status(500).return() // Response {"message":"Internal Server Error","status":500}```
* res.return() - This function is a replacement for res.send(), using this function we include additional information to the response such as message, status and data.
** Example ```res.return({name: "Anoop"}) // Output {"message":"OK","status":200, data: {name: "Anoop"}}```


## Demo Link
https://blooming-bayou-26551.herokuapp.com

## "Detailed documentation in progress, also share your valuable comments and features to be added to the seed"
