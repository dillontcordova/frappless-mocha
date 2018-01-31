/**
 * Created by dcordova on 8/16/17.
 */

const NOCK      = require('nock');
const CONFIG    = require('../config/mochaConfig');

class MochaNock {

    static clean() {
        NOCK.cleanAll();
    }

    static nock( _url ){
        return {
            post: ( __link ) => {
                return {
                    reply: ( ___cb ) => {
                        if( CONFIG.getIsMock() ){
                            NOCK( _url )
                                .post   ( __link || '' )
                                .reply  ( ___cb )
                            ;
                        }
                    },
                    replyWithError: ( ___errorMsg ) => {
                        if( CONFIG.getIsMock() ){
                            NOCK( _url )
                                .post           ( __link || '' )
                                .replyWithError ( ___errorMsg )
                            ;
                        }
                    },
                    replyWithFile: ( ___status, ___filePath ) => {
                        if( CONFIG.getIsMock() ){
                            NOCK( _url )
                                .post           ( __link || '' )
                                .replyWithFile  ( ___status, ___filePath )
                            ;
                        }
                    },
                }
            },
            get: ( __link ) => {
                return {
                    reply: ( ___cb ) => {
                        if( CONFIG.getIsMock() ){
                            NOCK( _url )
                                .get    ( __link || '' )
                                .reply  ( ___cb )
                            ;
                        }
                    },
                    replyWithError: ( ___errorMsg ) => {
                        if( CONFIG.getIsMock() ){
                            NOCK( _url )
                                .get            ( __link || '' )
                                .replyWithError ( ___errorMsg )
                            ;
                        }
                    },
                    replyWithFile: ( ___status, ___filePath ) => {
                        if( CONFIG.getIsMock() ){
                            NOCK( _url )
                                .get            ( __link || '' )
                                .replyWithFile  ( ___status, ___filePath )
                            ;
                        }
                    },
                }
            },
            put: ( __link ) => {
                return {
                    reply: ( ___cb ) => {
                        if( CONFIG.getIsMock() ){
                            NOCK( _url )
                                .put    ( __link || '' )
                                .reply  ( ___cb )
                            ;
                        }
                    },
                    replyWithError: ( ___errorMsg ) => {
                        if( CONFIG.getIsMock() ){
                            NOCK( _url )
                                .put            ( __link || '' )
                                .replyWithError ( ___errorMsg )
                            ;
                        }
                    },
                    replyWithFile: ( ___status, ___filePath ) => {
                        if( CONFIG.getIsMock() ){
                            NOCK( _url )
                                .put            ( __link || '' )
                                .replyWithFile  ( ___status, ___filePath )
                            ;
                        }
                    },
                }
            },
            'delete': ( __link ) => {
                return {
                    reply: ( ___cb ) => {
                        if( CONFIG.getIsMock() ){
                            NOCK( _url )
                                .delete ( __link || '' )
                                .reply  ( ___cb )
                            ;
                        }
                    },
                    replyWithError: ( ___errorMsg ) => {
                        if( CONFIG.getIsMock() ){
                            NOCK( _url )
                                .delete         ( __link || '' )
                                .replyWithError ( ___errorMsg )
                            ;
                        }
                    },
                    replyWithFile: ( ___status, ___filePath ) => {
                        if( CONFIG.getIsMock() ){
                            NOCK( _url )
                                .delete         ( __link || '' )
                                .replyWithFile  ( ___status, ___filePath )
                            ;
                        }
                    },
                }
            },
        };
    }
}

module.exports = MochaNock;