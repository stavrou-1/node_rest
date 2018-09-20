## This repository utilizes MongoDB database ##
author: <stav0049@gmail.com>

## For GETs -> http://localhost:3000/tasks ##

`In order to start this api:

1.) Navigate to the root of this project and type: 'node server' to start our server
2.) mongod --version for mongodb version data
3.) type 'mongo' at /todoListApi root
4.) Able to use Postman to POST, GET, DELETE, PUT data
`

`To switch from developement mode to production mode type:

------ NODE_ENV=production node server.js

in terminal at project root.`

## For POSTS -> http://localhost:3000/tasks ##
## Click Body and then switch to x-www-form-urlencoded ##
## Add a key of 'name' and enter a value to its right. Click Send ##
## Your new data will be posted to mongo database and the api's JSON will change ##

`For shelling into mongo database:

1.) See all your databases:
----- show dbs

2.) Select the database
----- use your_database_name

3.) Show the collections
----- show collections

This will list all the collections in your selected database.

4.) See all the data
----- db.collection_name.find()

or ~

----- db.collection_name.find().pretty()`

## For shelling new mongo db data ##
## visit: https://docs.mongodb.com/manual/reference/method/db.collection.insert/ ##

`db.tasks.insert(
   {
   "status": [
      "pending"
    ],
      "name": "sip on some soup",
      "__v": 0
   }
)`
