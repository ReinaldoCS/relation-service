import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from '../../app/repositories/users-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
