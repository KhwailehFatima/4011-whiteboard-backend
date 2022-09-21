'use strict'

const { UserModel } = require('../models/index')

module.exports = async (req, res, next) => {
    console.log('From inside the middleware');
    if (!req.headers.authorization) {
        next('You\'re not authorized!!!!!!!!!!')
    }

    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1];

    try {
        const validUser = await UserModel.authenticateToken(token)

        const userInfo = await UserModel.findOne({ where: { username: validUser.username } })
        if (userInfo) {
            req.user = userInfo;
            req.token = userInfo.token;

            next();
        } else {
            next('You\'re not authorized!!!!!!!!!!');
        }

        console.log("userInfo: ", userInfo)

    } catch (error) {
        next('Invalid login');
    }

}