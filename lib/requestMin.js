/**
 * Created by dcordova on 11/6/17.
 */

const REQUEST = require('request');
'use strict';

function RequestMinified( _url ){

    function defaultCB( __err, __res ){
        console.info( '!A callback was not used in the parameters, this is not the proper use of "Frappless Request Minified Wrapper"' );
        if(__err){
            console.info( `!URL was npt reached. Here is the error: ${JSON.stringify(__err)}` );
        } else {
            console.info( `URL was successfully reached. Here is the response: ${JSON.stringify(__res)}` );
        }
    }

    return {
        get: function ( ){
            return {
                complete: function ( ___cb ) {
                    REQUEST({
                        url: _url,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }, ___cb || defaultCB);
                }
            };
        },

        post: function( __body ){
            return {
                complete: function ( ___cb ) {
                    REQUEST({
                        url: _url,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(__body)
                    }, ___cb || defaultCB);
                }
            };
        },

        put: function( __body ){
            return {
                complete: function ( ___cb ) {
                    REQUEST({
                        url: _url,
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify( __body )
                    }, ___cb || defaultCB);
                }
            };

        },

        delete: function( __body ){
            return {
                complete: function ( ___cb ) {
                    REQUEST({
                        url: _url,
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(__body)
                    }, ___cb || defaultCB);
                }
            };
        }
    };
}

module.exports = RequestMinified;