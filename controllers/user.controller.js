'use strict';
const bcrypt = require( 'bcrypt' );
const base64 = require( 'base-64' );

const User = require( '../models' ).UserModel;

const signup = async ( req, res ) => {
    try {
        const { username, email, password } = req.body;
        const data = {
            username,
            email,
            password: await bcrypt.hash( password, 10 )
        };
        const user = await User.create( data );
        if ( user ) {
            res.status( 200 ).json( user );
        }
    } catch ( error ) {
        console.log( error );
    }
};

const allUser = async ( req, res ) => {
    const users = await User.findAll();
    res.json( users );
};

const login = async ( req, res ) => {

    const basicHeader = req.headers.authorization.split( ' ' );
    console.log(req.headers.authorization)
    const encodedValue = basicHeader.pop();
    const decodedValue = base64.decode( encodedValue );
    console.log( decodedValue );
    const [ username, password ] = decodedValue.split( ':' );
    const user = await User.findOne( {
        where: {
            username: username
        }
    } );
    if ( user ) {
        const isSame = await bcrypt.compare( password, user.password );
        if ( isSame ) {
            return res.status( 200 ).json( user );
        } else {
            return res.status( 401 ).send( 'You are not authorized' );
        }
    } else {
        return res.status( 401 ).send( 'You are not authorized' );
    }
};


module.exports = {
    signup,
    allUser,
    login
};