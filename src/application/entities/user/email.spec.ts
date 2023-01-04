import { Email } from './email';

describe('User email', () => {
  it('should be able to a user Email', () => {
    const email = new Email('FOR.BAR@GMAIL.COM.br');

    expect(email).toBeTruthy();
    expect(email.value).toEqual('for.bar@gmail.com.br');
  });

  it('should not be able to a user Email with invalidated type', () => {
    const emailTestOne = '@gmail.com';
    const emailTestTwo = 'foo.bar@gmail.';
    const emailTestTree = 'foo.bar@gmailcom';
    const emailTestFour = 'foo.bargmail.com';

    expect(() => new Email(emailTestOne)).toThrowError();
    expect(() => new Email(emailTestTwo)).toThrowError();
    expect(() => new Email(emailTestTree)).toThrowError();
    expect(() => new Email(emailTestFour)).toThrowError();
  });
});
