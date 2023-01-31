import { AppException } from '@helpers/AppException';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { RegisterUser } from './register-user';
import { ResetPassword } from './reset-password';

describe('Reset password', () => {
  it('should be able to reset password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();

    const registerUser = new RegisterUser(inMemoryUsersRepository);
    const resetPassword = new ResetPassword(inMemoryUsersRepository);

    await registerUser.execute({
      name: 'Foo Bar',
      email: 'for.bar@gmail.com.br',
      password: 'Myp@ssw0rd',
    });

    const { status } = await resetPassword.execute({
      email: 'for.bar@gmail.com.br',
      newPassword: 'MyNewP@ssw0rd',
    });

    expect(status).toEqual('success');
  });

  it('should not be able to reset password with E-mail not registered', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();

    const resetPassword = new ResetPassword(inMemoryUsersRepository);

    expect(async () => {
      await resetPassword.execute({
        email: 'for.bar@gmail.com.br',
        newPassword: 'MyNewP@ssw0rd',
      });
    }).rejects.toThrow(AppException);
  });
});
