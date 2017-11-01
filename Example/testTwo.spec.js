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
        response    = null;
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

        FRAPPLESS.nock( url )
            .post( '/heavy' )
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

        FRAPPLESS.nock(url)
            .put(`/${jobId}`)
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

            FRAPPLESS.request( url )
                .post('')
                .send({})
                .end( ( err, res ) => {
                    console.info( `Portal was successfully reached. here is the response: ${JSON.stringify(res)}` );
                    FRAPPLESS.expect(err).to.equal(null);
                    _done(err || null);
                })
            ;
        });

        it('should GET to /:jobId and receive back job data and status', ( _done ) => {
            url += `/${jobId}`;

            FRAPPLESS.request( url )
                .get('')
                .end(( err, res ) => {
                    console.info( `Portal was successfully reached. here is the response: ${JSON.stringify(res)}` );
                    FRAPPLESS.expect(err).to.be.equal(null);
                    FRAPPLESS.expect(res.body).to.not.be.equal(null);
                    _done(err || null);
                })
            ;
        });

        it('should PUT to /:jobId and receive back an id', ( _done ) => {
            url += `/${jobId}`;

            let status  = 'IN PROGRESS';
            let data = {
                state: 'decrypt'
            };

            FRAPPLESS.request( url )
                .put('')
                .send({
                    data:       data,
                    jobId:      jobId,
                    status:     status
                })
                .end(( err, res ) => {
                    console.info( `Portal was successfully reached. here is the response: ${JSON.stringify(res)}` );
                    FRAPPLESS.expect(err).to.be.equal(null);
                    FRAPPLESS.expect(res.body).to.not.be.equal(null);
                    _done(err || null);
                })
            ;
        });

        it.EtoE('should do an E2E', ( _done ) => {
            let lightURL = url + '/light';
            let jobIdURL = url + `/${jobId}`;
            let status  = 'IN PROGRESS';
            let data = {
                state: 'decrypt'
            };

            FRAPPLESS.request( lightURL )
                .put('')
                .send({
                    data:       data,
                    jobId:      jobId,
                    status:     status
                })
                .end(( err, res ) => {
                    FRAPPLESS.request( jobIdURL )
                        .get('')
                        .end(( err, res ) => {
                            console.info( `Portal was successfully reached. here is the response: ${JSON.stringify(res)}` );
                            FRAPPLESS.expect(err).to.be.equal(null);
                            FRAPPLESS.expect(res.body).to.not.be.equal(null);
                            _done(err || null);
                        })
                    ;
                })
            ;
        });
    });
});