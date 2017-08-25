/**
 * Created by dcordova on 8/16/17.
 */

const SELF      = global || window;
const MOCHA     = require('mocha');
const MOCK_AWS  = require('../mock/mochaAws');
const NOCK      = require('../mock/mochaNock');
const CONFIG    = require('../config/mochaConfig');

function setEtoE( _isEtoE ) {
    CONFIG.setIsMock( !_isEtoE );

    SELF['mochaTest'] = SELF.it;

    if( _isEtoE ){
        SELF.it = function(){};
    }
    SELF.it.EtoE = SELF.mochaTest;

    delete SELF.mochaTest;
}

function promiseOrganizer( ...funcList ){
    (function asyncTestRun( _index ){
        new Promise( (_resolve, _reject) => {
            CONFIG.start( _resolve, _reject );
            funcList[_index]();
        }).then(function ( _event ){
            CONFIG.setEvent(_event);
            if( _index < funcList.length-1 ){
                asyncTestRun( ++_index );
            }
        }).catch(function( err ){
            throw err;
        });
    })(0);
}

module.exports = {
    Nock: NOCK,
    Aws: MOCK_AWS,
    setEtoE: setEtoE,
    getConfig: () => CONFIG,
    promiserOrganizer: promiseOrganizer
};