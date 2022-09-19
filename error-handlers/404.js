'use strict';

module.exports = ( err, req, res, next ) => {
    res.send( {
        code: 404,
        message: `Page Not Found`
    } );
};