/**
 * Created by dcordova on 8/16/17.
 */

const MOCK_AWS  = require('mock-aws-sinon');
const CONFIG    = require('../config/mochaConfig');

class MochaAws {

    constructor(){
        this.mockAwsList = [];
    }

    mock(...awsParams ){

        if( CONFIG.getIsMock() ){
            if( awsParams.length < 3 ){
                throw new Error('improper use of AWS Mock');
            } else {
                MOCK_AWS( ...awsParams );
                this.mockAwsList.push( [awsParams[0], awsParams[1]] );
            }
        }
    }

    restore( _major, _minor ){

        if( CONFIG.getIsMock() ){
            if ( !_major || !_minor ){
                for( let mockedAws of this.mockAwsList ){
                    MOCK_AWS( mockedAws[0], mockedAws[1] ).restore();
                }
            } else {
                MOCK_AWS( _major, _minor ).restore();
            }
        }
    }
}

module.exports = MochaAws;