const _ = require('lodash');

module.exports = _.mapValues(
  {
    aliceInWonderland: require('./alice-in-wonderland'),
    littleRedRidingHood: require('./little-red-riding-hood'),
    aModestProposal: require('./a-modest-proposal'),
    firstInaguralAddress: require('./george-washington-address'),
    fiftySoups: require('./fifty-soups'),
    theGateToCaesarBook1: require('./the-gate-to-caesar-book-1')
  },
  sample => _.assign(sample, { text: sample.text.join('\n\n') })
);
