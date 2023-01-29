import { User } from '../entities/user';
import { Email } from '../entities/email';
import { Name } from '../entities/name';
import { Password } from '../entities/password';
import { UsersRepository } from '../repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { AppException } from '@helpers/AppException';

interface RegisterUserRequest {
  name: string;
  password: string;
  email: string;
}

interface RegisterUserResponse {
  user: User;
}

@Injectable()
export class RegisterUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    const { name, email, password } = request;

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppException('Email in use');
    }

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
