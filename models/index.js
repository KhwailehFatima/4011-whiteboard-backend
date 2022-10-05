'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model');
const comment = require('./comment.model');
const user = require('./user.model');

const collection = require('../collections/user-comment-routes');

 const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}


const POSTGRES_URL = process.env.DATABASE_URL


let sequelize = new Sequelize(POSTGRES_URL,
    sequelizeOption
);

// check if you  are authenticated and the connection is connected or not
sequelize.authenticate().then(() => {
    console.log('Database Connected to fatimakh')
}).catch((error) => {
    console.log(error)
});

const postModel = post(sequelize, DataTypes);
const commentModel = comment(sequelize, DataTypes);
const userModel = user(sequelize, DataTypes);

// add relations between post and comment
postModel.hasMany(commentModel, { foreignKey: 'postID', sourceKey: 'id' })
commentModel.belongsTo(postModel, { foreignKey: 'postID', targetKey: 'id' })

// add relations between user and comment
userModel.hasMany(commentModel, { foreignKey: 'userID', sourceKey: 'id' })
commentModel.belongsTo(userModel, { foreignKey: 'userID', targetKey: 'id' })


// adding creator from userModel userName to commentModel creator

commentModel.addHook('beforeCreate', async (comment) => {
    const user = await userModel.findOne({ where: { id: comment.userID } })
    comment.creator = user.userName
})

// collections
const postCollection = new collection(postModel);
const commentCollection = new collection(commentModel);

module.exports = {
    db: sequelize,
    Post: postCollection,
    Comment: commentCollection,
    commentModel: commentModel,
    userModel: userModel
}