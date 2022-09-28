"use strict";

const { userModel } = require("../models/index");

const bearerAuth = async (req, res, next) => {
  //    console.log('from inside the middleware');
  if (!req.headers.authorization) {
    next("You are not Authorized");
  }
  const token = req.headers.authorization.split(" ").pop();

  try {
    const validUser = await userModel.authenticateToken(token);
    // console.log(validUser)
    const userInfo = await userModel.findOne({
      where: { userName: validUser.userName },
    });
    // console.log(userInfo)
    if (userInfo) {
      req.user = userInfo;
      req.token = userInfo.token;
      next();
    } else {
      next("Invalid Login");
    }
  } catch (error) {
    next("Invalid Login");
  }
};

module.exports = bearerAuth;