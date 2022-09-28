"use strict";

const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return jwt.sign({ userName: this.userName }, process.env.JWT_SECRET);
      },
      set(tokenObj) {
        return jwt.sign(tokenObj, process.env.JWT_SECRET);
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'user', 'test'),
      allowNull: false,
      defaultValue: 'test'
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get: function () {
        const acl = {
          admin: ['read', 'create', 'update', 'delete'],
          user: ['read', 'create'],
          test: ['read']
        }
        return acl[this.role]
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
    });
  };
  return User;
};