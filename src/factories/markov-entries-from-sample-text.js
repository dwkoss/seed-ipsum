const _ = require('lodash');

const orderedPreviousEntries = (seedSplit, maxIndex, order) => {
    const beginningIndex = Math.max(maxIndex - order, 0);

    return _.reverse(_.slice(seedSplit, beginningIndex, maxIndex));
}

module.exports = (seed, order=1) => {
    // split by space and punctuation, keep the punctuation
    // If a punctuation ends the seed text, append it to the beginning to allow for wrapping.
    // If there is no punctuation at the end, end and begin text with a period to allow for wrapping.
    const trimSeed = _.trim(seed);
    const properEscapedNewLineSeed = trimSeed.replace(/\r/g, '\n');    
    const wrappedSeed = `\n${properEscapedNewLineSeed}\n`;
    const removeDuplicateNewLines = wrappedSeed.replace(/(\n)\1+/g, '\n');
    const seedSplit = removeDuplicateNewLines.split(/(\n)|(?=\s|\.|!|\?)/).filter(i => i);
    const entriesForEachOrder = _.times(seedSplit.length - 1, index => ({
        next: seedSplit[index + 1],
        previous: orderedPreviousEntries(seedSplit, index + 1, order)
    }));

    return entriesForEachOrder;
}
