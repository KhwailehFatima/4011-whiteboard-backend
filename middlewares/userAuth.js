'use strict';

const { userModel } = require('../models/index');

const basicAuth = async (req, res, next) => {
    try {

        // we need to search for username in the Database
        const userName =  await userModel.findOne({
            where: {userName: req.body.userName}
        })

        if (userName) {
            return res.status(409).send('Username already exists')
        }
    
        // we need to search for the email in the Database
        const email =  await userModel.findOne({
            where: {email: req.body.email}
        })

        if (email) {
            return res.status(409).send('Email already exists')
        }
    
        next();

    } catch (error) {
        console.log(error.message);
    }
    
}

module.exports = basicAuth;