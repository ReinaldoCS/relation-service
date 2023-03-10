import { User } from '@application/entities/user';
import { UsersRepository } from '@application/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userAlreadyExists = this.users.find(
      (user) => user.email.value === email,
    );

    if (!userAlreadyExists) {
      return null;
    }

    return userAlreadyExists;
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.email === user.email);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }
}
