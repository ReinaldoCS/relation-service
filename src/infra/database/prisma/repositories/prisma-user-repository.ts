import { Injectable } from '@nestjs/common';
import { User } from '@application/entities/user';
import { UsersRepository } from '@application/repositories/users-repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prisma.users.create({
      data: {
        id: user.id,
        name: user.name.value,
        email: user.email.value,
        password: user.password.value,
        created_at: user.createdAt,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const userAlreadyExists = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!userAlreadyExists) {
      return null;
    }

    return PrismaUserMapper.toDomain(userAlreadyExists);
  }

  async save(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prisma.users.update({
      where: {
        email: user.email.value,
      },
      data: raw,
    });
  }
}
