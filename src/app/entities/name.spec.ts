import { Name } from './name';

describe('User name', () => {
  it('should be able to a user name', () => {
    const name = new Name('Foo Bar');

    expect(name).toBeTruthy();
    expect(name.value).toEqual('Foo Bar');
  });

  it('should not be able to a user name with less than 3 characters', () => {
    expect(() => new Name('f'.repeat(2))).toThrowError();
  });

  it('should not be able to a user name with less than 20 characters', () => {
    expect(() => new Name('f'.repeat(21))).toThrowError();
  });
});
