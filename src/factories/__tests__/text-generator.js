const _ = require('lodash');

const Markov = require('../../models/markov');
const textGen = require('../text-generator');

describe('text-generator', () => {
  const textMarkov = new Markov(1, [
    {
      next: 'a',
      previous: ['b']
    },
    {
      next: 'b',
      previous: ['a']
    },
    {
      next: 'a',
      previous: ['c']
    },
    {
      next: 'c',
      previous: ['a']
    }
  ]);

  let spy;
  beforeEach(() => {
    spy = jest.spyOn(textMarkov, 'getEntriesGivenThreshold');
  });
  afterEach(() => {
    spy.mockClear();
  });

  it('accepts a markov and terminates after after a regex passes', () => {
    spy = jest.spyOn(textMarkov, 'getEntriesGivenThreshold');

    const generatedText = textGen(textMarkov, ['a'], 1, new RegExp('a'));

    expect(spy).toHaveBeenCalledWith(['a'], 1);

    // will either choose b or c as the next character
    try {
      expect(spy).toHaveBeenCalledWith(['b', 'a'], 1);
      expect(generatedText).toEqual('ba');
    } catch (e) {
      expect(spy).toHaveBeenCalledWith(['c', 'a'], 1);
      expect(generatedText).toEqual('ca');
    }
  });

  it('will generate a number of segments', () => {
    const generatedText = _.times(100, () =>
      textGen(textMarkov, ['a'], 1, new RegExp('d'), new RegExp('a'), 2)
    );

    expect(generatedText).toEqual(
      expect.arrayContaining(['baba', 'baca', 'caba', 'caca'])
    );
  });
});
