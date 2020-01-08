# EventCounter

This is a JavaScript library that helps record (any kind of) incremental events, and query the number of events during the specific spantime.

[![Build Status](https://travis-ci.com/zlargon/EventCounter.svg?branch=master)](https://travis-ci.com/zlargon/EventCounter) [![Coverage Status](https://coveralls.io/repos/github/zlargon/EventCounter/badge.svg?branch=master)](https://coveralls.io/github/zlargon/EventCounter?branch=master)

## Install

```bash
npm install event-counter
```

## Example

```js
const EventCounter = require('event-counter');

const eventCounter = EventCounter();
eventCounter.increment();
eventCounter.increment();
eventCounter.increment();

// query the number of the events ocurred in last 1 sec
eventCounter.query(1000);   // return 3

// after 10 seconds ...
eventCounter.increment();
eventCounter.increment();

// query the number of the events ocurred in last 1 sec
eventCounter.query(1000);  // retrun 2
```

## Test

```bash
git clone https://github.com/zlargon/EventCounter.git

# npm
npm install
npm test        # unit test
npm run cover   # generate code coverage report to ./coverage/lcov-report/index.html
```

## Licence

MIT
