/**
 * Created by dcordova on 8/16/17.
 */

const NOCK      = require('nock');
const CONFIG    = require('../config/mochaConfig');

class MochaNock {

    constructor(){
        this.isMock = CONFIG.getIsMock();
    }

    restore() {
        NOCK.cleanAll();
    }

    mock( _url ){
        return {
            post: ( __link ) => {
                return {
                    reply: ( ___cb ) => {
                        if( this.isMock ){
                            NOCK( _url )
                                .post   ( __link )
                                .reply  ( ___cb )
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
                    },
                    replyWithFile: ( ___status, ___filePath ) => {
                        if( this.isMock ){
                            NOCK( _url )
                                .post           ( __link )
                                .replyWithFile  ( ___status, ___filePath )
                            ;
                        }
                    },
                }
            }
        };
    }
}

module.exports = MochaNock;