import { User } from '../../src/app/entities/user';
import { UsersRepository } from '../../src/app/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
