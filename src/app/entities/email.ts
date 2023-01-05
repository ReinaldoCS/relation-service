export class Email {
  private readonly email: string;

  constructor(email: string) {
    const isEmailHasTypeEmail = this.validateEmailType(email);

    if (!isEmailHasTypeEmail) {
      throw new Error('E-mail type are not allowed.');
    }

    this.email = email.toLocaleLowerCase();
  }

  public get value(): string {
    return this.email;
  }

  private validateEmailType(email: string): boolean {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return regex.test(email);
  }
}
