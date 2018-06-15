/**
 * Created by dcordova on 8/16/17.
 */

const GLOBAL    = global || window;
const EXPECT    = require('chai').expect;
const MAWS      = require('./lib/mochaAws');
const NOCK      = require('./lib/mochaNock');
const CONFIG    = require('./config/mochaConfig');


(function constructor( ){

    const env_Var   = process.env.IS_MOCKED;
    let isMocked    = true;
    if( env_Var ){
        isMocked = !!JSON.parse( env_Var );
    }

    CONFIG.setIsMock( isMocked );
    MAWS.init       ( );

    GLOBAL['expect'] = EXPECT;
    GLOBAL['mochaTest'] = GLOBAL.it;

    if( !isMocked ){
        GLOBAL.it = function(){};
    }
    GLOBAL.it.EtoE = function(title, fn){
        GLOBAL.mochaTest( title, (done) => {
            fn( ( err, data ) => {
                CONFIG.setPayload( data );
                done( err );
            }, CONFIG.getPayload() );
        });
    };

    delete require.cache[require.resolve('frappless-mocha')];
})();


module.exports = {
    expect      : EXPECT,
    aws         : MAWS.mock,
    nock        : NOCK.nock,
    setIsMock   : CONFIG.setIsMock,
    getIsMock   : CONFIG.getIsMock,
    setPayload  : CONFIG.setPayload,
    getPayload  : CONFIG.getPayload,
    clean       : function( ){
        NOCK.clean();
        MAWS.clean();
    }
};
