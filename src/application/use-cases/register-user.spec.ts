import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository';
import { RegisterUser } from './register-user';

describe('Register user', () => {
  it('should be able to register a user', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();

    const registerUser = new RegisterUser(inMemoryUsersRepository);

    const { user } = await registerUser.execute({
      name: 'Foo Bar',
      email: 'for.bar@gmail.com.br',
      password: 'Myp@ssw0rd',
    });

    expect(user).toBeTruthy();
    expect(inMemoryUsersRepository.users).toHaveLength(1);
    expect(inMemoryUsersRepository.users[0]).toEqual(user);
  });
});
