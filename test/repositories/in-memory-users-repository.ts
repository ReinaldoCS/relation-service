import { User } from '../../src/application/entities/user';
import { UsersRepository } from '../../src/application/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
