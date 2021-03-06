/**
 * Created by dcordova on 8/16/17.
 */

const MOCK_AWS  = require('mock-aws-sinon');
const CONFIG    = require('../config/mochaConfig');

class MochaAws {

    static init(){
        MochaAws.prototype.mockAwsList = [];
    }

    static mock( ...awsParams ){

        if( CONFIG.getIsMock() ){
            let tmpInfo = console.info;
            console.info = ()=>{};

            const paramLen = awsParams.length;

            if( typeof awsParams[paramLen-1] === 'function' ){
                if( paramLen < 3 ){
                    throw new Error('!Improper use of AWS Mock');
                } else {
                    MOCK_AWS( ...awsParams );
                    MochaAws.prototype.mockAwsList.push( [awsParams[0], awsParams[1]] );
                }
            } else {
                if( paramLen > 2 ){
                    throw new Error('!Improper use of AWS Mock');
                } else {
                    MochaAws.prototype.mockAwsList.push( [awsParams[0], awsParams[1]] );
                    return MOCK_AWS( ...awsParams );
                }
            }

            console.info = tmpInfo;
        }
    }

    static clean(_major, _minor ){

        if( CONFIG.getIsMock() ){
            if ( !_major || !_minor ){
                for( let mockedAws of MochaAws.prototype.mockAwsList ){
                    MOCK_AWS( mockedAws[0], mockedAws[1] ).restore();
                }
            } else {
                MOCK_AWS( _major, _minor ).restore();
            }
        }
    }
}

module.exports = MochaAws;
