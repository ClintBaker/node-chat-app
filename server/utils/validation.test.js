const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var nonStr = isRealString(12334);
    expect(nonStr).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    var whiteSpace = isRealString('    ');
    expect(whiteSpace).toBe(false);
  });

  it('should allow strings with non-space characters', () => {
    var str = isRealString('valid string');
    expect(str).toBe(true);
  });
})
