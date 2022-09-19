'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const post = require( './post.model' );
const comment = require('./comment.model')
const user = require( './user.model' );
const POSTGRES_URL = process.env.DATABASE_URL ;
const collection = require('../collections/user-comment-routes')

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

let sequelize = new Sequelize( 
     POSTGRES_URL, 
    //  sequelizeOption 
     );

const postModel = post(sequelize, DataTypes);
const commentModel = comment(sequelize,DataTypes);
const userModel = user(sequelize, DataTypes);

postModel.hasMany(commentModel, {foreignKey: 'ownerID', sourceKey: 'id'}) // 1 to many
commentModel.belongsTo(postModel, {foreignKey: 'ownerID', targetKey: 'id'})

const postCollection = new collection(postModel);
const commentCollection =new collection(commentModel);



module.exports = {
    db: sequelize,
    Post: postCollection,
    Comment: commentCollection,
    CommentModel: commentModel,
    PostModel: postModel,
    UserModel: userModel
};