const EventCounter = () => {
  // the list of the events' timestamp
  const eventTimes = [];

  /**
   * when the events occur, increment the new timestamps to the events
   */
  const increment = (currentTime = Date.now()) => {
    // const currentTime = Date.now(); // for test
    const delta = eventTimes.length === 0 ? 0 : currentTime - eventTimes[0].timestamp;

    eventTimes.push({
      timestamp: currentTime,
      delta
    });
  }

  /**
   * query the number of the events in specific timespan
   * @param {number} spantime spantime in milliseconds
   * @return {number}         the number of the events
   */
  const query = (spantime, currentTime = Date.now()) => {
    // const currentTime = Date.now(); // for test

    // check spantime
    if (typeof spantime !== 'number') {
      throw new TypeError(`spantime (${spantime}) should be number type`);
    }
    if (spantime < 0 || spantime > 5 * 60 * 1000) {
      throw new RangeError(`spantime (${spantime}ms) should be in 0 ~ 5 mins`);
    }

    if (eventTimes.length === 0) {
      return 0;
    }
    // 1. find the index of the delta which is over than 'target' delta
    const target = currentTime - eventTimes[0].timestamp - spantime;
    if (target <= eventTimes[0].delta) {
      return eventTimes.length;
    }
    if (eventTimes[eventTimes.length - 1].delta < target) {
      return 0;
    }

    // 2. binary search O(log n)
    const closedIdx = binarySearch(target);
    const closedVal = eventTimes[closedIdx].delta

    // 3. find the result by checking the index O(m)
    let i;  // index of the result
    if (closedVal < target) {
      // find next value which is over than target value
      for (i = closedIdx; i < eventTimes.length && eventTimes[i].delta < target; i++);
    } else {
      // find the leftmost index whose value is equal to closed value
      for (i = closedIdx; i >= 0 && eventTimes[i].delta === closedVal; i--);
      i++;
    }

    // 4. return counter
    return eventTimes.length - i;
  }

  /**
   * subfunction: binarySearch
   */
  const binarySearch = (target) => {
    let left = 0;
    let right = eventTimes.length - 1;
    let mid;
    while (left <= right) {
      mid = left + Math.floor((right - left) / 2);    // avoid overflow
      if (eventTimes[mid].delta == target) return mid;     // found

      if (target < eventTimes[mid].delta) {
        right = mid - 1;  // in the left
      } else {
        left = mid + 1;   // in the right
      }
    }

    // not found, return the closed index
    return mid;
  }

  return {
    query,
    increment
  }
}

module.exports = EventCounter;
