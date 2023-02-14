import { Email } from '@application/entities/email';
import { Name } from '@application/entities/name';
import { Password } from '@application/entities/password';
import { User } from '@application/entities/user';

type Override = Partial<User>;

export function makeUser(override: Override = {}) {
  return new User({
    name: new Name('Foo Bar'),
    email: new Email('for.bar@gmail.com.br'),
    password: new Password('Myp@ssw0rd'),
    createdAt: new Date(),
    ...override,
  });
}
