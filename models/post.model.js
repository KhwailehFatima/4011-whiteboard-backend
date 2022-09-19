'use strict';

const Post = ( sequelize, DataTypes ) => sequelize.define( 'Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: 'My name is Fatima'
    },
    img : {
        type: DataTypes.STRING,
        defaultValue: 'https://www.computersciencedegreehub.com/wp-content/uploads/2016/02/what-is-coding-768x512.jpg'
    }
});

module.exports = Post;

