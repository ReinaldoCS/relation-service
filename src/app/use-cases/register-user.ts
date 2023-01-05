import { User } from '../entities/user';
import { Email } from '../entities/email';
import { Name } from '../entities/Name';
import { Password } from '../entities/password';
import { UsersRepository } from '../repositories/users-repository';

interface RegisterUserRequest {
  name: string;
  password: string;
  email: string;
}

interface RegisterUserResponse {
  user: User;
}

export class RegisterUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    const { name, email, password } = request;

    const user = new User({
      name: new Name(name),
      email: new Email(email),
      password: new Password(password),
      createdAt: new Date(),
    });

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
