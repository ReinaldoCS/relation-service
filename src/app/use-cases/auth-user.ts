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

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (!userAlreadyExists) {
      throw new AppException('Email invalid');
      // throw new AppException('E-mail or password invalid.');
    }

    if (userAlreadyExists.password.value != password) {
      console.log('user password -> ' + userAlreadyExists.password.value);
      console.log('body password -> ' + password);

      throw new AppException('Password invalid.');
      // throw new AppException('E-mail or password invalid.');
    }

    const payload = {
      id: userAlreadyExists.id,
    };
    const secret = 'my-secret';
    const option = { expiresIn: '1h' };
    const token = jwt.sign(payload, secret, option);

    console.log('token -> ' + token);

    return token;
  }
}
