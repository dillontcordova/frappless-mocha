
const requestMinified = require('./requestMin');

module.exports = {
    get: function( optsOrUrl, cb ){
        requestMinified( 'GET', optsOrUrl, cb );
    },
    post: function( optsOrUrl, cb ){
        requestMinified( 'POST', optsOrUrl, cb );
    },
    put: function( optsOrUrl, cb ){
        requestMinified( 'PUT', optsOrUrl, cb );
    },
    'delete': function( optsOrUrl, cb ){
        requestMinified( 'DELETE', optsOrUrl, cb );
    }
};