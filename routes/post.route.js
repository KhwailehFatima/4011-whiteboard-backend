'use strict';

const express = require( 'express' );
const router = express.Router();

const { Post, CommentModel } = require( '../models/index' );

// Routes
router.get( '/post', getAllPostswithComments );
router.get( '/post/:id', getOnePostWithComments );
router.post( '/post', addPost );
router.put( '/post/:id', updatePost );
router.delete( '/post/:id', deletePost );


 
async function getAllPostswithComments ( req, res ) {
    let posts = await Post.readWithComments( CommentModel );
    res.status( 200 ).json( {
        posts
    } );
}

 
async function getOnePostWithComments ( req, res ) {
    const id = req.params.id;
    const post = await Post.readOneWithComments( id, CommentModel );
    res.status( 200 ).json( post );
}

 
async function addPost ( req, res ) {
    const newPost = req.body;
    console.log("=================================================", Post.create)
     Post.create( newPost )
        .then( async () => {
            await Post.read()
                .then( ( posts ) => {
                    res.status( 200 ).json( posts );
                } );
        } );
}


async function updatePost ( req, res ) {
    const id = req.params.id;
    const obj = req.body;
    const post = await Post.update( id, obj );
    res.status( 201 ).json( post );
}

 
async function deletePost ( req, res ) {
    const id = req.params.id;
    await Post.delete( id ).then( () => {
        res.status( 204 ).send( '' );
    } );
}



module.exports = router;