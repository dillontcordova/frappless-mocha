/**
 * Created by dillo_000 on 8/26/2017.
 */

const FRAPPLESS = require('../mock/index');
const REQUEST   = require('supertest');

const AWS       = require('aws-sdk');
AWS.config.region   = 'us-west-2';
const DOC_CLIENT    = new AWS.DynamoDB.DocumentClient();

describe('describe', ( ) => {

    let url;
    let payload;
    let dataObj;
    let errorObj;

    beforeEach( ( ) => {
        dataObj = {};
        errorObj = null;
        url = 'http://www.example.com';
        payload = FRAPPLESS.getPayload() || {
            payload: 'test'
        };

        FRAPPLESS.aws( 'S3', 'getObject', (err, response) => {
            return {
                useless: 'string'
            };
        });

        FRAPPLESS.aws('DynamoDB', 'putItem', function (params, callback) {
            callback(errorObj, dataObj)
        });

        FRAPPLESS.nock( url )
            .get( '/' )
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

        it.EtoE( 'should Three', ( _done ) => {

            REQUEST( url )
                .get('/')
                .end( ( err, res ) => {
                    if (err) throw err;
                    _done( );
                })
            ;
        });
    })
});