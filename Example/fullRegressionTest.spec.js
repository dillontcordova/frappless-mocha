/**
 * Created by dillo_000 on 8/26/2017.
 */

const FRAPPLESS     = require('../index');
FRAPPLESS.setEtoE   ( false );

const TEST_ONE      = require('./testOne.spec');
const TEST_TWO      = require('./testTwo.spec');

(function asd() {
    let config = FRAPPLESS.getConfig();

    config.setPayload({});
    TEST_ONE();
    TEST_TWO();
})();