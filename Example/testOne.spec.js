/**
 * Created by dillo_000 on 8/26/2017.
 */

const FRAPPLESS     = require('../mock/index');
const REQUEST   = require('supertest');

describe('describe', ( ) => {

    let event;
    let url;

    beforeEach( ( ) => {
        url = 'http://www.asdasdsss.com';

        event = FRAPPLESS.getPayload() || {
            nothing: 'zilch'
        };

        FRAPPLESS.aws( 'S3', 'getObject', (err, response) => {
            return {
                useless: 'string'
            };
        });

        FRAPPLESS.nock( url )
            .delete( '/' )
            .reply(( _uri, _requestBody ) => {
                return [
                    200, //status code
                    'THIS IS THE REPLY BODY',
                    {'header': 'value'} //optional headers
                ]
            })
        ;

    });

    afterEach( ( ) => {
        FRAPPLESS.clean();
    });

    context( 'context', ( ) => {

        it.EtoE( 'should Two', ( _done ) => {
            REQUEST( url )
                .delete('')
                .end( ( err, res ) => {
                    if (err) throw err;
                    _done( );
                })
            ;
        });

        it( 'should Three', ( _done ) => {
            REQUEST( url )
                .get('/')
                .expect(200)
                .end( ( err, res ) => {
                    if (err) throw err;
                    _done( );
                })
            ;
        });
    })
});