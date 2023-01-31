import { UsersRepository } from '@application/repositories/users-repository';
import { AppException } from '@helpers/AppException';
import { Injectable } from '@nestjs/common';

interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

interface ResetPasswordResponse {
  status: 'success' | 'failed';
}

@Injectable()
export class ResetPassword {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const { email, newPassword } = request;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppException('User not found.');
    }

    user.setNewPassword(newPassword);

    await this.userRepository.save(user);

    return {
      status: 'success',
    };
  }
}
