'use strict';

const { userModel } = require('../models/index');
const bcrypt = require('bcrypt');
const base64 = require('base-64')

const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const data = {
            userName,
            email,
            password: await bcrypt.hash(password, 10)
        };

        const user = await userModel.create(data);

        if (user) {
            res.status(201).json(user);
        }

    } catch (error) {
        console.log(error.message);
    };
};

const allUser = async (req, res) => {
    const users = await userModel.findAll();
    res.status(200).json(users)
};

const signin = async (req, res) => {
    const basicHeader = req.headers.authorization.split(' ');
    const encodedValue = basicHeader.pop();
    const decodedValue = base64.decode(encodedValue)
    // console.log(decodedValue)
    const [userName, password] = decodedValue.split(':');

    const user = await userModel.findOne({
        where: {userName: userName}
    });

    if(user) {
        const isSame = await bcrypt.compare(password, user.password);

        if(isSame) {
            return res.status(200).json({ 
                message: 'You are logged in',
                user: {
                    username: user.userName,
                    email: user.email,
                    id: user.id
                    },
                token: user.token})
        } else {
            return res.status(401).send('You are not Authorized')
        }
    } else {
        return res.status(401).send('You are not Authorized')
    }
};

module.exports = { signup, allUser, signin }