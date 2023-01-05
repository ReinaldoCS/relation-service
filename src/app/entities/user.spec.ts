import { User } from './user';
import { Email } from './email';
import { Name } from './Name';
import { Password } from './password';

describe('User', () => {
  it('should be able to create a user', () => {
    const user = new User({
      createdAt: new Date(),
      email: new Email('foo.bar@mailinator.com'),
      name: new Name('Foo Bar'),
      password: new Password('!Test123'),
    });

    expect(user).toBeTruthy();
  });
});
