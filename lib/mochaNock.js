/**
 * Created by dcordova on 8/16/17.
 */
const NOCK      = require('nock');
const CONFIG    = require('../config/mochaConfig');

const nock = {
    clean   : NOCK.cleanAll,
    nock    : function( _url ) {

        if( CONFIG.getIsMock() ){
            return NOCK( _url );
        }
    }
};

module.exports = nock;
