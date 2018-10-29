'use strict';

let mongoose = require('mongoose'),
    Authenticates = mongoose.model('Authenticate'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');


exports.createUser = (req, res) => {
    let userData = req.body;
    var user = new Authenticates(userData);
    user.save(function(err, auth) {
      if (err) {
        res.send(err);
      } else {
        let payload = { subject: auth._id };
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({token});
      }       
    });
}

// get logged in user by id
exports.getUserById = (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    console.log('Printing token from getUserById() : ' + token);
    jwt.verify(token, 'secretKey', (err, authData) => {
        console.log('Printing authData object : ' + authData);
        const theUser = authData.subject;
        if (err) {
            res.status(403).send({
                error: 'Recieved an unauthorized request.'
            });
        } else {
            Authenticates.findById(theUser, function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    data
                })
            });
        }
    })
}

// get logged in user by id
exports.getAllUsers = (req, res) => {
    Authenticates.find({}, function(err, users) {
        if (err)
        res.send(err);
        res.json(users);
    });
}

// log in user
exports.loginUser = (req, res) => {
    let userData = req.body;
    // we need to find the user in the db
    Authenticates.findOne({email: userData.email}, (err, user) => {
        if (err) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email');
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password');
                } else {
                    console.log("USER IS LOGGED IN. Let\'s sign the payload.")
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({token});
                }
            }
        }
    })
}

exports.events = (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events);
}

exports.special = (req, res) => {
    let special = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(special);
}