import { Module } from '@nestjs/common';
import { RegisterUser } from '@application/use-cases/register-user';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [RegisterUser],
})
export class HttpModule {}
