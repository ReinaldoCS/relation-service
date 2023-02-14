import { UsersRepository } from '@application/repositories/users-repository';
import { AppException } from '@helpers/AppException';
import { Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

interface AuthUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: AuthUserRequest) {
    const { email, password } = request;

    console.log();

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (!userAlreadyExists) {
      throw new AppException('E-mail or password invalid.');
    }

    if (userAlreadyExists.password.value != password) {
      throw new AppException('E-mail or password invalid.');
    }

    const payload = {
      id: userAlreadyExists.id,
    };

    const secret = process.env.JWT_SECRET ?? '';
    const option = { expiresIn: '1h' };

    const token = jwt.sign(payload, secret, option);

    console.log('token -> ' + token);

    return {
      token,
    };
  }
}
