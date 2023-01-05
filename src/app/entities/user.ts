/**
 * id - uuid
 * name - string
 * email - unique
 * password - string
 * createdAt - string
 * updateAt - string
 */

import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/Replace';
import { Email } from './email';
import { Name } from './Name';
import { Password } from './password';

interface UserProps {
  name: Name;
  email: Email;
  password: Password;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt: Date }>) {
    this._id = randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get name(): Name {
    return this.name;
  }

  public set name(name: Name) {
    this.name = name;
  }

  public get password(): Password {
    return this.password;
  }

  public set password(password: Password) {
    this.password = password;
  }

  public get email(): Email {
    return this.email;
  }

  public set email(email: Email) {
    this.email = email;
  }

  public get createdAt(): Date {
    return this.createdAt;
  }

  public get updatedAt(): Date | null {
    return this.updatedAt;
  }

  public set updatedAt(date: Date) {
    this.updatedAt = date;
  }
}
