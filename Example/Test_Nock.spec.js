/**
 * Created by dcordova on 8/30/17.
 */

const FRAPPLESS = require('../');

describe('Quarantine/', () => {

    let url;
    let event;
    let jobId;
    let response;
    let download;

    beforeEach(() => {
        response    = 'hello';
        event       = FRAPPLESS.getPayload() || {};
        url         = 'http://0.0.0.0:8080/v1/job';
        jobId       = '2528c2b3-108c-4c7f-af94-4cc1abe58171';
        download    = {
            Bucket: "cn-dmz-untrusted",
            Key: "package-a/santas-little-helper.jpg"
        };


        FRAPPLESS.nock( url )
            .post( '/light' )
            .reply(function () {
                return [200, response];
            })
        ;

        FRAPPLESS.nock(url)
            .get(`/${jobId}`)
            .reply(function () {
                return [200, response];
            })
        ;
    });

    afterEach(() => {
        FRAPPLESS.clean();
    });

    context('v1/job', () => {

        it('should POST to /light and receive back an id', ( _done ) => {
            url += '/light';

            FRAPPLESS
                .request( url )
                .post( download )
                .complete( function( __err, __res ){
                    console.info( `Portal was successfully reached. here is the response: ${JSON.stringify(__res)}` );
                    FRAPPLESS.expect(__err).to.equal(null);
                    _done(__err || null);
                })
            ;

        });

        it.EtoE('should GET to /:jobId and receive back job data and status', ( _done ) => {
            url += `/${jobId}`;

            FRAPPLESS
                .request( url )
                .get()
                .complete( function( __err, __res ){
                    console.info( `Portal was successfully reached. here is the response: ${JSON.stringify(__res)}` );
                    FRAPPLESS.expect(__err).to.be.equal(null);
                    FRAPPLESS.expect(__res.body).to.not.be.equal(null);
                    _done(__err || null);
                })
            ;

        });

        it('should do an E2E', ( _done ) => {
            let lightURL = url + '/light';
            let jobIdURL = url + `/${jobId}`;

            FRAPPLESS
                .request( lightURL )
                .post( download )
                .complete( function( __err, __res ){
                    if( !__err ){
                        FRAPPLESS
                            .request
                            .get(jobIdURL, ( __err, __res ) => {
                                console.info( `Portal was successfully reached. here is the response: ${JSON.stringify(__res)}` );
                                FRAPPLESS.expect(__err).to.be.equal(null);
                                FRAPPLESS.expect(__res.body).to.not.be.equal(null);
                                _done(__err || null);
                            })
                        ;
                    }
                })
            ;

        });

    });
});