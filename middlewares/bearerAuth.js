'use strict'

const userModel = require("../models/user.model");

module.exports = (req, res, next) => {
    console.log('From inside the middleware');
    if (!req.headers.authorization) {
        next('You\'re not authorized!!!!!!!!!!')
    }

    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ').pop();
    userModel.authenticateToken(token)
    next();
 }