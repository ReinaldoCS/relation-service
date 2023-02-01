import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { RegisterUser } from '@application/use-cases/register-user';
import { CreateUserBody } from '../dtos/create-user-body';
import { AppException } from '@helpers/AppException';
import { ResetPassword } from '@application/use-cases/reset-password';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private registerUser: RegisterUser,
    private resetPassword: ResetPassword,
  ) {}

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

  @Patch('reset')
  async password(@Req() request: Request, @Body() body: { password: string }) {
    try {
      const { password } = body;
      const email = request.headers['x-querystring'];

      if (!email) {
        throw new AppException('X-QueryString header with email not found.');
      }

      await this.resetPassword.execute({
        email: email.toString(),
        newPassword: password,
      });
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
