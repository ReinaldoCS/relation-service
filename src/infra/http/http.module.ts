import { Module } from '@nestjs/common';
import { RegisterUser } from '@application/use-cases/register-user';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './controllers/users.controller';
import { ResetPassword } from '@application/use-cases/reset-password';
import { AuthUser } from '@application/use-cases/auth-user';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [RegisterUser, ResetPassword, AuthUser],
})
export class HttpModule {}
