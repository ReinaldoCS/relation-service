import { AppException } from '@helpers/AppException';

export class Password {
  private readonly password: string;

  constructor(password: string) {
    const isPasswordLengthValid = this.validatePasswordLength(password);
    const isPasswordHasUpper = this.validatePasswordHasUpper(password);
    const isPasswordHasNumber = this.validatePasswordHasNumber(password);
    const isPasswordHasCharacterSequence =
      this.validateCharacterSequence(password);

    if (!isPasswordLengthValid) {
      throw new AppException('Password must be at least 8 characters long.');
    }

    if (!isPasswordHasUpper) {
      throw new AppException('Password must have at least 1 lowercase letter.');
    }

    if (!isPasswordHasNumber) {
      throw new AppException('Password must have at least 1 number.');
    }

    if (!isPasswordHasCharacterSequence) {
      throw new AppException(
        'Password has 3 characters repeated in sequence are not allowed.',
      );
    }

    this.password = password;
  }

  public get value(): string {
    return this.password;
  }

  private validatePasswordLength(password: string): boolean {
    return password.length >= 8;
  }

  private validatePasswordHasUpper(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  private validatePasswordHasNumber(password: string): boolean {
    return /[0-9]/.test(password);
  }

  private validateCharacterSequence(password: string): boolean {
    let count = 0;

    for (let i = 1; i < password.length; i++) {
      const previousChar = password[i - 1];
      const nextChar = password[i + 1];
      if (password[i] === previousChar && password[i] === nextChar) {
        count++;
      }
    }

    return count > 0 ? false : true;
  }
}

// [x] No mínimo 8 caracteres
// [x] Ao menos 1 letra minúscula
// [x] Ao menos 1 número
// [ ] 3 caracteres repetidos em sequência não são permitidos. Ex:(111, 222, aaa)
