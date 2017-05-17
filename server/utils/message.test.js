const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var obj = generateMessage('tony', 'whatup bish');
    expect(obj.from).toBe('tony');
    expect(obj.text).toBe('whatup bish');
    expect(obj.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    var from = 'tj';
    var lat = 1;
    var lng = 1;
    var url = 'https://www.google.com/maps?q=1,1'
    var message = generateLocationMessage(from, lat, lng);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
});
