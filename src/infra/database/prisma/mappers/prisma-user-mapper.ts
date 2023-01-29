import { Email } from '@application/entities/email';
import { Name } from '@application/entities/name';
import { Password } from '@application/entities/password';
import { User } from '@application/entities/user';
import { Users } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(raw: Users) {
    return new User({
      name: new Name(raw.name),
      email: new Email(raw.email),
      password: new Password(raw.password),
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
  }
}
