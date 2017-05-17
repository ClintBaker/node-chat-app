const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var obj = generateMessage('tony', 'whatup bish');
    expect(obj.from).toBe('tony');
    expect(obj.text).toBe('whatup bish');
    expect(obj.createdAt).toBeA('number');
  });
});
