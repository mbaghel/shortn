# shortn

A url shortening service built with express and mongoDB.  
Includes url validation on the server.  
Accepts get requests and responds with JSON objects (even on errors).  
Includes a basic front-end with form entry.

Base58 encoding & database models based on [coligio.io project](https://github.com/coligo-io/url-shortener-node-mongo-express/blob/master/app.js)

Made by [Michael Baghel](https://michaelbaghel.com/)

## Running locally

- Clone repo or download and unpack
- Install dependencies using npm
- Make sure you have a running Mongo database
- Add the connection URI for your MongoDB as an environment variable called MONGO_URI
- 'npm run start' to start the server on localhost
