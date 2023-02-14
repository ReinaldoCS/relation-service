import { Module } from '@nestjs/common';
import { RegisterUser } from '@application/use-cases/register-user';
import { DatabaseModule } from '../database/database.module';
import { ResetPassword } from '@application/use-cases/reset-password';
import { AuthUser } from '@application/use-cases/auth-user';
import { RegisterUserController } from './controllers/register.controller';
import { resetPasswordController } from './controllers/reset-password.controller';
import { AuthUserController } from './controllers/auth.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    RegisterUserController,
    resetPasswordController,
    AuthUserController,
  ],
  providers: [RegisterUser, ResetPassword, AuthUser],
})
export class HttpModule {}
