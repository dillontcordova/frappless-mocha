/**
 * Created by dillo_000 on 8/26/2017.
 */

const FRAPPLESS = require('../mock/index');
// const NOCK      = new FRAPPLESS.Nock();
const NOCK      = require('nock');
const AWS       = new FRAPPLESS.Aws();
const REQUEST   = require('supertest');
const CONFIG    = FRAPPLESS.getConfig();

function testTwo() {
    describe('describe', ( ) => {

        let event;
        let url;

        beforeEach( ( ) => {
            url = 'http://www.poasdp.com';

            event = CONFIG.getEvent() || {
                nothing: 'zilch'
            };

            AWS.mock( 'S3', 'getObject', (err, response) => {
                return {
                    useless: 'string'
                };
            });

            NOCK( url )
                .get( '/' )
                .delay({
                    head: 100, // header will be delayed for 2 seconds, i.e. the whole response will be delayed for 2 seconds.
                    body: 200  // body will be delayed for another 3 seconds after header is sent out.
                }).reply(( _uri, _requestBody ) => {
                    return [
                        200, //status code
                        'THIS IS THE REPLY BODY',
                        {'header': 'value'} //optional headers
                    ]
                })
            ;

        });

        afterEach( ( ) => {
            AWS.restore ( );
            // NOCK.restore( );
        });

        context( 'context', ( ) => {
            it( 'should One', ( _done ) => {
                setTimeout( ( ) => {
                    REQUEST( url )
                        .get('/')
                        .expect(200)
                        .end( ( err, res ) => {
                            if (err) throw err;
                            _done( );
                        })
                    ;
                }, 1500);
            });

            it.EtoE( 'should Two', ( _done ) => {
                REQUEST( url )
                    .get('/')
                    .expect(200)
                    .end( ( err, res ) => {
                        if (err) throw err;
                        _done( );
                    })
                ;
            });

            it( 'should Three', ( _done ) => {
                setTimeout( ( ) => {
                    REQUEST( url )
                        .get('/')
                        .expect(200)
                        .end( ( err, res ) => {
                            if (err) throw err;
                            _done( );
                        })
                    ;
                }, 0);
            });
        })
    })
}

module.exports = testTwo;