const expect = require('chai').expect;
const EventCounter = require('..');

describe('fast', () => {
  it('Case 1', async () => {
    // init
    const eventCounter = EventCounter();
    const input = [0, 2, 4, 8, 9, 10, 15, 15, 20, 20, 20, 30, 40, 50];
    input.forEach(t => {
      eventCounter.increment(t);
    });

    const lastTime = input[input.length - 1];
    expect(eventCounter.query(50, lastTime)).to.be.equal(14); // 50 - 50 = 0
    expect(eventCounter.query(20, lastTime)).to.be.equal(3);  // 50 - 20 = 30
    expect(eventCounter.query(30, lastTime)).to.be.equal(6);  // 50 - 30 = 20
    expect(eventCounter.query(32, lastTime)).to.be.equal(6);  // 50 - 32 = 18
    expect(eventCounter.query(35, lastTime)).to.be.equal(8);  // 50 - 35 = 15
    expect(eventCounter.query(0,  lastTime)).to.be.equal(1);  // 50 - 0  = 50
    expect(eventCounter.query(40, 60)).to.be.equal(6);        // 60 - 40  = 20
  });

  it('Case 2', async () => {
    // init
    const eventCounter = EventCounter();
    const input = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    input.forEach(t => {
      eventCounter.increment(t);
    });

    const lastTime = input[input.length - 1];
    expect(eventCounter.query(0, lastTime)).to.be.equal(11);
    expect(eventCounter.query(1, lastTime)).to.be.equal(11);
    expect(eventCounter.query(2, lastTime)).to.be.equal(11);
    expect(eventCounter.query(5, 10)).to.be.equal(0);
    expect(eventCounter.query(9, 10)).to.be.equal(11);
  });

  it('Exception Cases', async () => {
    const eventCounter = EventCounter();
    const input = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    input.forEach((val) => {
      eventCounter.increment(val);
    });

    expect(eventCounter.query.bind(null, '123')).to.throw(TypeError);
    expect(eventCounter.query.bind(null, -1)).to.throw(RangeError);
    expect(eventCounter.query.bind(null, 5 * 60 * 1000 + 1)).to.throw(RangeError);
  });
})
