'use strict'

const userModel=require('../models/index').userModel;

const acl=(capability)=>{
    return function (req, res, next){
        try {
            if(req.user.capabilities.includes(capability)){
                next();
            }
            else{
                next(`You dont have an access to ${capability}`);
            }

        } catch (error) {
            next('Try again');
        }
    } 
}
module.exports=acl;