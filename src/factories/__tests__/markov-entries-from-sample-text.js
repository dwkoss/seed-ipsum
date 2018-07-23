const constructMarkov = require('../markov-entries-from-sample-text');

describe('construct-markov-from-sample-text', () => {
  it('trims the seed input', () => {
    expect(constructMarkov('  a  ')).toEqual([
      {
        next: 'a',
        previous: ['\n']
      },
      {
        next: '\n',
        previous: ['a']
      }
    ]);
  });

  it('replaces return characters with new line characters', () => {
    expect(constructMarkov('a\r\r')).toEqual([
      {
        next: 'a',
        previous: ['\n']
      },
      {
        next: '\n',
        previous: ['a']
      }
    ]);
  });

  it('wraps the text with new lines', () => {
    expect(constructMarkov('a')).toEqual([
      {
        next: 'a',
        previous: ['\n']
      },
      {
        next: '\n',
        previous: ['a']
      }
    ]);
  });

  it('removes duplicate new lines', () => {
    expect(constructMarkov('a')).toEqual([
      {
        next: 'a',
        previous: ['\n']
      },
      {
        next: '\n',
        previous: ['a']
      }
    ]);
  });

  it('splits by space, and splits by and keeps new line, periods, exclamation points, and question marks', () => {
    expect(constructMarkov('a\nbc. d e f !! ? hi')).toEqual([
      {
        next: 'a',
        previous: ['\n']
      },
      {
        next: '\n',
        previous: ['a']
      },
      {
        next: 'bc',
        previous: ['\n']
      },
      {
        next: '.',
        previous: ['bc']
      },
      {
        next: ' d',
        previous: ['.']
      },
      {
        next: ' e',
        previous: [' d']
      },
      {
        next: ' f',
        previous: [' e']
      },
      {
        next: ' ',
        previous: [' f']
      },
      {
        next: '!',
        previous: [' ']
      },
      {
        next: '!',
        previous: ['!']
      },
      {
        next: ' ',
        previous: ['!']
      },
      {
        next: '?',
        previous: [' ']
      },
      {
        next: ' hi',
        previous: ['?']
      },
      {
        next: '\n',
        previous: [' hi']
      }
    ]);
  });

  it('passes ordered entries', () => {
    expect(constructMarkov('a b c d', 3)).toEqual([
      {
        next: 'a',
        previous: ['\n']
      },
      {
        next: ' b',
        previous: ['a', '\n']
      },
      {
        next: ' c',
        previous: [' b', 'a', '\n']
      },
      {
        next: ' d',
        previous: [' c', ' b', 'a']
      },
      {
        next: '\n',
        previous: [' d', ' c', ' b']
      }
    ]);
  });
});
