import { Email } from '@application/entities/email';
import { Name } from '@application/entities/name';
import { Password } from '@application/entities/password';
import { User } from '@application/entities/user';
import { Users } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(raw: Users): User {
    return new User({
      name: new Name(raw.name),
      email: new Email(raw.email),
      password: new Password(raw.password),
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
  }

  static toPrisma(user: User): Users {
    return {
      id: user.id,
      name: user.name.value,
      email: user.email.value,
      password: user.password.value,
      created_at: user.createdAt,
      updated_at: new Date(),
    };
  }
}
