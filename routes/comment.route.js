'use strict';

const express = require( 'express' );
const router = express.Router();

const { Comment } = require( '../models/index' );

// Routes
router.get( '/comment', getAllComments );
router.post( '/comment/:id', addComment );
router.put( '/comment/:id', updateComment );
router.delete( '/comment/:id', deleteComment );


 
async function getAllComments ( req, res ) {
    let comments = await Comment.read();
    res.status( 200 ).json( {
        comments
    } );
}

 
async function addComment ( req, res ) {
    const postId = req.params.id;
    const content = req.body.content;
    const obj = {'ownerID': postId ,'content': content};
    await Comment.create( obj )
        .then( async () => {
            await Comment.read()
                .then( ( comments ) => {
                    res.status( 200 ).json( comments );
                } );
        } );
}
 
async function updateComment ( req, res ) {
    const id = req.params.id;
    const obj = req.body;
    const comment = await Comment.update( id,obj );
    res.status( 201 ).json( comment );
}

 
async function deleteComment ( req, res ) {
    const id = req.params.id;
    await Comment.delete( id ).then( () => {
        res.status( 204 ).send( '' );
    } );
}


module.exports = router;