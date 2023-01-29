import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterUser } from '@application/use-cases/register-user';
import { CreateUserBody } from '../dtos/create-user-body';
import { PasswordError } from '@application/errors/password-exception';

@Controller('users')
export class UsersController {
  constructor(private registerUser: RegisterUser) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password } = body;

    try {
      const { user } = await this.registerUser.execute({
        name,
        email,
        password,
      });

      return {
        user,
      };
    } catch (error) {
      if (error instanceof PasswordError) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      }
    }
  }
}
