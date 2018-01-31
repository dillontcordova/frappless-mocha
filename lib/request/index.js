
const requestMinified = require('./requestMin');

module.exports = {
    get: function( optsOrUrl ){
        requestMinified( 'GET', optsOrUrl );
    },
    post: function( optsOrUrl ){
        requestMinified( 'POST', optsOrUrl );
    },
    put: function( optsOrUrl ){
        requestMinified( 'PUT', optsOrUrl );
    },
    'delete': function( optsOrUrl ){
        requestMinified( 'DELETE', optsOrUrl );
    }
};