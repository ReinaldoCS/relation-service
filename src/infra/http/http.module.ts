import { Module } from '@nestjs/common';
import { RegisterUser } from '@application/use-cases/register-user';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './controllers/users.controller';
import { ResetPassword } from '@application/use-cases/reset-password';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [RegisterUser, ResetPassword],
})
export class HttpModule {}
