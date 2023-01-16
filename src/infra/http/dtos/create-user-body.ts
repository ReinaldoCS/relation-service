import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  @Length(3, 20)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Length(8)
  @IsString()
  password: string;
}
