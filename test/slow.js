const expect = require('chai').expect;
const EventCounter = require('..');

const wait = (time) => new Promise(resolve => {
  setTimeout(resolve, time);
});

describe('slow', () => {
  it('', async () => {
    // init
    const eventCounter = EventCounter();
    eventCounter.increment();
    eventCounter.increment();
    eventCounter.increment();
    await wait(2000);
    eventCounter.increment();
    eventCounter.increment();
    eventCounter.increment();
    await wait(2000);
    eventCounter.increment();
    eventCounter.increment();
    eventCounter.increment();

    // test
    expect(eventCounter.query(1000)).to.be.equal(3);
    expect(eventCounter.query(2000)).to.be.equal(3);
    expect(eventCounter.query(3000)).to.be.equal(6);
  });

  it('empty', async () => {
    const eventCounter = EventCounter();
    expect(eventCounter.query(1000)).to.be.equal(0);
  });
})
