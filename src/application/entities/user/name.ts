export class Name {
  private name: string;

  constructor(name: string) {
    const isNameLengthValid = this.validateNameLength(name);

    if (!isNameLengthValid) {
      throw new Error('Name length error.');
    }
    this.name = name;
  }

  public get value(): string {
    return this.name;
  }

  private validateNameLength(name: string) {
    return name.length >= 3 && name.length <= 20;
  }
}
