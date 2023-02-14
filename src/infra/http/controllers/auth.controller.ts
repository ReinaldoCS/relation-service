import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AppException } from '@helpers/AppException';
import { AuthUser } from '@application/use-cases/auth-user';
import { AuthUserBody } from '../dtos/user-body';

@Controller('users')
export class AuthUserController {
  constructor(private authUser: AuthUser) {}

  @Post('auth')
  async sign(@Body() body: AuthUserBody) {
    try {
      const token = await this.authUser.execute(body);

      return {
        token,
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
