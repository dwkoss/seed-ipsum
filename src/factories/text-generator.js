const _ = require('lodash');

module.exports = (markov, startingEntries, selectionThreshold, hardTerminatorRegex, segmentTerminatorRegex, numberOfSegments) => {
    let prevText = startingEntries;

    let text = '';
    let nextWord;

    const isTerminated = word =>
        hardTerminatorRegex.test(word) ||
        (segmentTerminatorRegex && segmentTerminatorRegex.test(word));

    for (let i = 0; i < (numberOfSegments || 1); i++) {
        do {
            nextWord = _.sample(markov.getEntriesGivenThreshold(
                prevText,
                selectionThreshold
            ));
    
            prevText = [nextWord, ...prevText];
            text += nextWord;
        } while (!isTerminated(nextWord))
    
        if (hardTerminatorRegex.test(nextWord)) {
            break;
        }
    }

    return text;
};

/*
module.exports = (sampleText, order, selectionThreshold, sentencesPerParagraph) => {
    const sampleTextMarkov = markov(sampleText, order);

    const prevText = ['\n'];

    const sentences = [];

    for (var i = 0; i < sentencesPerParagraph; i++) {
        let nextWord;
        let sentence = '';

        do {
            nextWord = _.sample(sampleTextMarkov.getEntriesGivenThreshold(
                prevText,
                selectionThreshold
            ));

            prevText.unshift(nextWord);
            sentence += nextWord;
        } while (!sentenceTerminator.test(nextWord))

        sentences.push(sentence);

        if (paragraphTerminator.test(nextWord)) {
            break;
        }
    };

    return sentences;
}
*/