/**
 * Created by dcordova on 8/30/17.
 */

const FRAPPLESS = require('../');
const AWS       = FRAPPLESS.aws;
const NOCK      = FRAPPLESS.nock;
const REQUEST   = FRAPPLESS.request;
const EXPECT    = FRAPPLESS.expect;

const AWS_SDK           = require('aws-sdk');
AWS_SDK.config.region   = 'us-west-2';
const DOC_CLIENT        = new AWS_SDK.DynamoDB.DocumentClient();

describe('Quarantine/', () => {

    let url;
    let response;
    let dataObj;
    let errorObj;

    beforeEach(() => {
        dataObj     = {};
        errorObj    = null;
        response    = 'hello';
        url         = 'http://0.0.0.0:8080/v1/job';


        NOCK( url )
            .post( '/light' )
            .reply(function () {
                return [200, response];
            })
        ;

        AWS('DynamoDB', 'getItem', function (params, callback) {
            callback(errorObj, dataObj)
        });

    });

    afterEach(() => {
        FRAPPLESS.clean();
    });

    context('v1/job', () => {

        it('should POST to /light and receive back an id', ( _done ) => {
            url += '/light';
            let download    = {
                Bucket: "cn-dmz-untrusted",
                Key: "package-a/santas-little-helper.jpg"
            };

            REQUEST( url )
                .post( download )
                .complete( function( __err, __res ){
                    console.info( `Portal was successfully reached. here is the response: ${JSON.stringify(__res)}` );
                    EXPECT(__err).to.equal(null);
                    _done(__err || null);
                })
            ;
        });

        it.EtoE('should GET a record back from DynamoDB', ( _done ) => {
            let params = {
                TableName: 'EXAMPLE_TABLE',
                Key: {
                    'KEY_NAME': 'value'
                }
            };

            DOC_CLIENT.get(params, function( _err, _data ){
                EXPECT(_err).to.equal(null);
                _done( _err || null );
            })
        });
    });
});