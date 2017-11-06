/**
 * Created by dillo_000 on 8/26/2017.
 */

const FRAPPLESS         = require('../index');
const AWS_SDK           = require('aws-sdk');
AWS_SDK.config.region   = 'us-west-2';
const S3                = new AWS_SDK.S3();
const DOC_CLIENT        = new AWS_SDK.DynamoDB.DocumentClient();

describe('describe', ( ) => {

    let dataObj;
    let errorObj;

    beforeEach( ( ) => {
        dataObj = {};
        errorObj = null;

        FRAPPLESS.aws( 'S3', 'getObject', (err, response) => {
            return {
                useless: 'string'
            };
        });

        FRAPPLESS.aws( 'DynamoDB', 'getItem', function (params, callback) {
            callback(errorObj, dataObj)
        });
    });

    afterEach( ( ) => {
        FRAPPLESS.clean();
    });

    context( 'context', ( ) => {

        it.EtoE( 'should Three', ( _done ) => {
            let params = {
                TableName: 'EXAMPLE_TABLE',
                Key: {
                    'KEY_NAME': 'value'
                }
            };

            DOC_CLIENT.get(params, function( _err, _data ){
                FRAPPLESS.expect(_err).to.equal(null);
                _done( _err || null );
            })
        });

        it.EtoE( 'should Three', ( _done ) => {
            S3.getObject( {Bucket: 'test'}, function(err, response) {
                FRAPPLESS.expect(err).to.equal(null);
                _done( err || null );
            })
        });
    })
});