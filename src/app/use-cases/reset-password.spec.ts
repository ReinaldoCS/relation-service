import { Email } from '@application/entities/email';
import { AppException } from '@helpers/AppException';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { ResetPassword } from './reset-password';

describe('Reset password', () => {
  it('should be able to reset password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const resetPassword = new ResetPassword(inMemoryUsersRepository);

    const user = makeUser({
      email: new Email('for.bar@gmail.com.br'),
    });

    inMemoryUsersRepository.create(user);

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
