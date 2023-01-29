import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { RegisterUser } from '@application/use-cases/register-user';
import { CreateUserBody } from '../dtos/create-user-body';
import { AppException } from '@helpers/AppException';

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
      if (error instanceof AppException) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        });
      }

      const errorMessage = (error as Error).message;
      throw new InternalServerErrorException(errorMessage);
    }
  }
}
