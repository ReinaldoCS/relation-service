import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUser } from 'src/app/use-cases/register-user';
import { CreateUserBody } from '../dtos/create-user-body';

@Controller('users')
export class UsersController {
  constructor(private registerUser: RegisterUser) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password } = body;

    const { user } = await this.registerUser.execute({
      name,
      email,
      password,
    });

    return {
      user,
    };
  }
}
