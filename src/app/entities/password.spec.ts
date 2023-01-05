import { Password } from './password';

describe('User password', () => {
  it('should be able to a user password', () => {
    const password = new Password('!Testing12');
    expect(password).toBeTruthy();
  });

  it('should not be able a user password with less than 8 characters', () => {
    expect(() => new Password('!Test35')).toThrowError();
  });

  it('should not be able to a user password without upper character', () => {
    expect(() => new Password('!test359')).toThrowError();
  });

  it('should not be able to a user password without number character', () => {
    expect(() => new Password('!Testing')).toThrowError();
  });

  it('should not be able to a user password with character sequence', () => {
    expect(() => new Password('!Test1nggg')).toThrowError();
  });
});
