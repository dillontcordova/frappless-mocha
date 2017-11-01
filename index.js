/**
 * Created by dcordova on 8/16/17.
 */

const GLOBAL    = global || window;
const MAWS      = require('./mock/mochaAws');
const NOCK      = require('./mock/mochaNock');
const CONFIG    = require('./config/mochaConfig');
const EXPECT    = require('chai').expect;


(function constructor( ){

    const env_Var = process.env.IS_MOCKED;
    let isMocked = true;
    if( env_Var ){
        isMocked = env_Var === 'false' ? false: !!env_Var;
    } else {
        isMocked = env_Var === 0 ? false: isMocked;
    }

    CONFIG.setIsMock( isMocked );
    MAWS.init();

    GLOBAL['expect'] = EXPECT;
    GLOBAL['mochaTest'] = GLOBAL.it;

    if( !isMocked ){
        GLOBAL.it = function(){};
    }
    GLOBAL.it.EtoE = GLOBAL.mochaTest;

    delete GLOBAL.mochaTest;
})();


module.exports = {
    clean: function(){
        NOCK.clean();
        MAWS.clean();
    },
    aws: MAWS.mock,
    expect: EXPECT,
    nock: NOCK.nock,
    setPayload: CONFIG.setPayload,
    getPayload: CONFIG.getPayload,
    setIsMock: CONFIG.setIsMock
};
