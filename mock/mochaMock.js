/**
 * Created by dcordova on 8/7/17.
 */

const NOCK      = require('nock');
const MOCK_AWS  = require('mock-aws-sinon');
const CONFIG    = require('../../config/mochaConfig');

class MochaMock {

    constructor(){
        this.mockAwsList = [];
        this.isMock      = CONFIG.getIsMock();
    }

    nock( _url ){
        return {
            post: ( __link ) => {
                return {
                    reply: ( ___status, ___cb ) => {
                        if( this.isMock ){
                            NOCK( _url )
                                .post   ( __link )
                                .reply  ( ___status, ___cb )
                            ;
                        }

                    },
                    replyWithError: ( ___errorMsg ) => {
                        if( this.isMock ){
                            NOCK( _url )
                                .post           ( __link )
                                .replyWithError ( ___errorMsg )
                            ;
                        }
                    }
                }
            }
        };
    }

    aws( ...awsParams ){

        if( this.isMock ){
            MOCK_AWS( ...awsParams );
            this.mockAwsList.push( [awsParams[0], awsParams[1]] );
        }
    }

    restoreAws( _major, _minor ){

        if( this.isMock ){
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

module.exports = MochaMock;