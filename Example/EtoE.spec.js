/**
 * Created by dillo_000 on 8/26/2017.
 */

const FRAPPLESS = require('../index');
FRAPPLESS.setEtoE(true);

const TEST_ONE  = require('./testOne.spec');
const TEST_TWO  = require('./testTwo.spec');

let config = FRAPPLESS.getConfig();

config.setPayload({});
TEST_ONE();
TEST_TWO();
// FRAPPLESS.promiseOrganizer( TEST_ONE);


