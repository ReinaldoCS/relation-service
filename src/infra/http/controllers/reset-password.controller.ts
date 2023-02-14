import { ResetPassword } from '@application/use-cases/reset-password';
import { AppException } from '@helpers/AppException';
import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Patch,
  Req,
} from '@nestjs/common';
import { ResetUserPasswordBody } from '../dtos/user-body';

@Controller('users')
export class resetPasswordController {
  constructor(private resetPassword: ResetPassword) {}

  @Patch('reset')
  async password(@Req() request: Request, @Body() body: ResetUserPasswordBody) {
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
