const _ = require('lodash');

class Markov {
  // entries is an array of objects {next: 'an entry, previous: ['previous1', 'previous2']

  constructor(order, entries) {
    this.order = order;

    const entriesForEachOrder = _.flatten(
      _.map(entries, entry => {
        return _.reduce(
          entry.previous,
          (orderedEntryAccumulator, previous) => {
            orderedEntryAccumulator.push({
              next: entry.next,
              previous: [
                ..._.get(_.last(orderedEntryAccumulator), 'previous', []),
                previous
              ]
            });

            return orderedEntryAccumulator;
          },
          []
        );
      })
    );

    this._entriesMap = _.reduce(
      entriesForEachOrder,
      (allEntries, entry) => {
        const strPrevStates = JSON.stringify(entry.previous);

        if (!allEntries.get(strPrevStates)) {
          allEntries.set(strPrevStates, []);
        }

        allEntries.get(strPrevStates).push(entry.next);

        return allEntries;
      },
      new Map()
    );
  }

  /**
   *
   * @param {string[]} previousStates a set of previous states.
   *                   If n is the length of previousStates, it is ordered by,
   *                   [nth order, (n-1)th order, ... 1st order]
   *
   * @returns {string[][]} returns a nested array of entries where
   *                   each item in the outer array represents a collection of entries for a subset of the previousStates.
   *                     each subset is taken one item at a time from the end of the array.
   *                     The 0th item in the array represents all that occur for the last item in previousStates,
   *                     The 1st item in the array represents all that occur for the last item, and the 2nd to last item in previousStates,
   *                     The last item in the array represents all entries that occur for all previousStates
   *                   each item in each sub array is an entry
   *
   * @example
   * // using set-builder notation
   * const entries = getEntriesForAllOrdersGivenPreviousStates(['a', 'b', 'c'])
   * // returns an array of arrays where
   * // entries[0] = {entries | a} = order 1
   * // entries[1] = {entries | ab} = order 2
   * // entries[2] = {entries | abc} = order 3
   */
  getEntriesPerOrder(previousStates) {
    return _.times(Math.min(previousStates.length, this.order), index => {
      const strPrevStates = JSON.stringify(_.take(previousStates, index + 1));

      return this._entriesMap.get(strPrevStates) || [];
    });
  }

  // starting from the rightmost set of entries, pick a set of entries if length is greater than threshold
  getEntriesGivenThreshold(previousStates, selectionThreshold = 1) {
    const entriesForAllOrders = this.getEntriesPerOrder(previousStates);

    return (
      _.findLast(
        entriesForAllOrders,
        entries => entries.length >= selectionThreshold
      ) || _.first(entriesForAllOrders)
    );
  }
}

module.exports = Markov;
