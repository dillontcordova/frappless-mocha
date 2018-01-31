/**
 * Created by dcordova on 8/16/17.
 */

const GLOBAL        = global || window;
const MAWS          = require('./lib/mochaAws');
const NOCK          = require('./lib/mochaNock');
const REQUEST       = require('./lib/request');
const CONFIG        = require('./config/mochaConfig');
const EXPECT        = require('chai').expect;


(function constructor( ){

    const env_Var = process.env.IS_MOCKED;
    let isMocked = true;
    if( env_Var ){
        const lowerCase = env_Var.toLowerCase();
        isMocked = lowerCase === 'false' || lowerCase === '0' ? false: !!env_Var;
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
    delete require.cache[require.resolve('frappless-mocha')];
})();


module.exports = {
    clean: function(){
        NOCK.clean();
        MAWS.clean();
    },
    aws: MAWS.mock,
    expect: EXPECT,
    nock: NOCK.nock,
    request: REQUEST,
    setIsMock: CONFIG.setIsMock,
    setPayload: CONFIG.setPayload,  //might be useless now
    getPayload: CONFIG.getPayload   //might be useless now
};
