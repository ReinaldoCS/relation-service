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
    return this.props.name;
  }

  public set name(name: Name) {
    this.props.name = name;
  }

  public get password(): Password {
    return this.props.password;
  }

  public set password(password: Password) {
    this.props.password = password;
  }

  public get email(): Email {
    return this.props.email;
  }

  public set email(email: Email) {
    this.props.email = email;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  public set updatedAt(date: Date) {
    this.props.updatedAt = date;
  }
}
