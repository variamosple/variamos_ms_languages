export class LanguageOwner {
  constructor(
    public id?: string,
    public name?: string,
    public email?: string,
    public accessLevel?: string
  ) {}

  public static builder(): LanguageOwnerBuilder {
    return new LanguageOwnerBuilder();
  }

  public static build(builder: LanguageOwnerBuilder): LanguageOwner {
    return new LanguageOwner(builder.getId(), builder.getName());
  }
}

class LanguageOwnerBuilder {
  private id?: string;
  private name?: string;
  private email?: string;
  private accessLevel?: string;

  public setId(id: string): LanguageOwnerBuilder {
    this.id = id;
    return this;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public setName(name: string): LanguageOwnerBuilder {
    this.name = name;
    return this;
  }

  public getName(): string | undefined {
    return this.name;
  }

  public setEmail(email: string): LanguageOwnerBuilder {
    this.email = email;
    return this;
  }

  public getEmail(): string | undefined {
    return this.email;
  }

  public setAccessLevel(accessLevel: string): LanguageOwnerBuilder {
    this.accessLevel = accessLevel;
    return this;
  }

  public getAccessLevel(): string | undefined {
    return this.accessLevel;
  }

  public build(): LanguageOwner {
    return LanguageOwner.build(this);
  }
}
