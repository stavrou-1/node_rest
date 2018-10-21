'use strict';

let jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request.');
        }
        let token = req.headers.authorization.split(' ')[0];
        if (token === 'null') {
            return res.status(401).send('Unauthorized request.');
        }
        let payload = jwt.verify(token, 'secretKey');
        if (!payload) {
            return res.status(401).send('Unauthorized request.');
        }
        res.userId = payload.subject;
        next();
    }    
}