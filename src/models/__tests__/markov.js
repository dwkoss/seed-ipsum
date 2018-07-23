const Markov = require('../markov');

describe('markov', () => {
  it('adds an entry for one previous state', () => {
    const markov = new Markov(1, [
      {
        next: 'one entry',
        previous: ['one previous state']
      }
    ]);

    expect(markov.getEntriesPerOrder(['one previous state'])).toEqual([
      ['one entry']
    ]);
  });

  it('adds the same entry multiple times for the same previous state', () => {
    const markov = new Markov(1, [
      {
        next: 'one entry',
        previous: ['one previous state']
      },
      {
        next: 'one entry',
        previous: ['one previous state']
      }
    ]);

    expect(markov.getEntriesPerOrder(['one previous state'])).toEqual([
      ['one entry', 'one entry']
    ]);
  });

  it('adds different entries for the same previous state', () => {
    const markov = new Markov(1, [
      {
        next: 'first entry',
        previous: ['one previous state']
      },
      {
        next: 'second entry',
        previous: ['one previous state']
      }
    ]);

    expect(markov.getEntriesPerOrder(['one previous state'])).toEqual([
      ['first entry', 'second entry']
    ]);
  });

  it('adds the same entries for multiple previous states', () => {
    const markov = new Markov(2, [
      {
        next: 'first entry',
        previous: ['n-1', 'n-2']
      },
      {
        next: 'second entry',
        previous: ['n-1', 'n-2']
      }
    ]);

    expect(markov.getEntriesPerOrder(['n-1', 'n-2'])).toEqual([
      ['first entry', 'second entry'],
      ['first entry', 'second entry']
    ]);
  });

  it('adds the same entry for the same first order, but different 2nd order', () => {
    const markov = new Markov(2, [
      {
        next: 'first entry',
        previous: ['a', 'b']
      },
      {
        next: 'second entry',
        previous: ['a', 'c']
      }
    ]);

    expect(markov.getEntriesPerOrder(['a'])).toEqual([
      ['first entry', 'second entry']
    ]);
    expect(markov.getEntriesPerOrder(['a', 'b'])).toEqual([
      ['first entry', 'second entry'],
      ['first entry']
    ]);
    expect(markov.getEntriesPerOrder(['a', 'c'])).toEqual([
      ['first entry', 'second entry'],
      ['second entry']
    ]);
  });

  it('adds the same entry for the same 2nd order, but different first order', () => {
    const markov = new Markov(2, [
      {
        next: 'first entry',
        previous: ['a', 'b']
      },
      {
        next: 'second entry',
        previous: ['c', 'b']
      }
    ]);

    expect(markov.getEntriesPerOrder(['a', 'b'])).toEqual([
      ['first entry'],
      ['first entry']
    ]);
    expect(markov.getEntriesPerOrder(['c', 'b'])).toEqual([
      ['second entry'],
      ['second entry']
    ]);
  });

  it('getEntriesForPreviousStates returns an orders entries whos length surpasses a threshold', () => {
    const markov = new Markov(3, [
      {
        next: 'first entry',
        previous: ['a', 'b', 'c']
      },
      {
        next: 'second entry',
        previous: ['a', 'b', 'noop']
      },
      {
        next: 'third entry',
        previous: ['a', 'b', 'noop']
      }
    ]);

    expect(markov.getEntriesGivenThreshold(['a', 'b', 'c'], 1)).toEqual([
      'first entry'
    ]);
    expect(markov.getEntriesGivenThreshold(['a', 'b', 'c'], 2)).toEqual([
      'first entry',
      'second entry',
      'third entry'
    ]);
    expect(markov.getEntriesGivenThreshold(['a', 'b', 'c'], 5)).toEqual([
      'first entry',
      'second entry',
      'third entry'
    ]);
  });
});
