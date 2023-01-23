import { Injectable } from '@nestjs/common';
import { User } from '@application/entities/user';
import { UsersRepository } from '@application/repositories/users-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prismaService.users.create({
      data: {
        id: user.id,
        name: user.name.value,
        email: user.email.value,
        password: user.password.value,
        created_at: user.createdAt,
      },
    });
  }
}
