/**
 * Created by dcordova on 11/6/17.
 */
const REQUEST = require('request');

function defaultCb( __err, __res ){
    console.info( '!A callback was not used in the parameters, this is not the proper use of "Frappless.request"' );
    if(__err){
        console.error( `!Err: URL was not reached. Here is the error: ${JSON.stringify(__err)}` );
    } else {
        console.info( `URL was successfully reached. Here is the response: ${JSON.stringify(__res)}` );
    }
}


module.exports = function( method, opts, cb ){

    const requestParams = {
        method  : method,
        url     : opts.url || opts,
        headers : opts.headers || {'Content-Type': 'application/json'}
    };

    if( opts.body ){
        requestParams.body = (typeof body !== 'string') ? JSON.stringify(body): body;
    }

    if( opts.qs ){
        requestParams.qs = opts.qs;
    }

    REQUEST( requestParams, cb || defaultCb );
};