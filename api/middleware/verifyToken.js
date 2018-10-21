'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
    // middleware to check if the token is valid or not.
    verifyToken: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request.');
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauthorized request.');
        }
        let payload = jwt.verify(token, 'secretKey');
        if (!payload) {
            return res.status(401).send('Unauthorized request.');
        }
        req.userId = payload.subject;
        next();
    }    
}