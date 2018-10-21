'use strict';

let mongoose = require('mongoose'),
    Authenticates = mongoose.model('Authenticate'),
    jwt = require('jsonwebtoken');


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