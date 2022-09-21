'use strict';

const jwt = require('jsonwebtoken');



module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true,
            unique: true
        },
        token: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return jwt.sign({
                    username: this.username,
                }, process.env.JWT_SECRET)
            },
            set(tokenObj) {
                return jwt.sign(tokenObj, process.env.JWT_SECRET)
            }
        }
    });

    User.authenticateToken = (token) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return err;
            } else {
                return decoded;
            }
        })
    }
    return User;
}

