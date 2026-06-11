import { LanguageOwner } from "./LanguageV2Owner";

export class Language {
  constructor(
    public id?: number,
    public name?: string,
    public abstractSyntax?: JSON,
    public concreteSyntax?: JSON,
    public type?: string,
    public stateAccept?: string,
    public semantics?: JSON,
    public userId?: string,
    public ownerName?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public owners?: LanguageOwner[]
  ) {}

  public static builder(): LanguageBuilder {
    return new LanguageBuilder();
  }

  public static build(builder: LanguageBuilder): Language {
    return new Language(
      builder.getId(),
      builder.getName(),
      builder.getAbstractSyntax(),
      builder.getConcreteSyntax(),
      builder.getType(),
      builder.getStateAccept(),
      builder.getSemantics(),
      builder.getUserId(),
      builder.getOwnerName(),
      builder.getCreatedAt(),
      builder.getUpdatedAt(),
      builder.getOwners()
    );
  }
}

class LanguageBuilder {
  private id?: number;
  private name?: string;
  private abstractSyntax?: JSON;
  private concreteSyntax?: JSON;
  private type?: string;
  private stateAccept?: string;
  private semantics?: JSON;
  private userId?: string;
  private ownerName?: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private owners?: LanguageOwner[];

  public setId(id: number): LanguageBuilder {
    this.id = id;
    return this;
  }

  public getId(): number | undefined {
    return this.id;
  }

  public setName(name: string): LanguageBuilder {
    this.name = name;
    return this;
  }

  public getName(): string | undefined {
    return this.name;
  }

  public setAbstractSyntax(abstractSyntax: JSON): LanguageBuilder {
    this.abstractSyntax = abstractSyntax;
    return this;
  }

  public getAbstractSyntax(): JSON | undefined {
    return this.abstractSyntax;
  }

  public setConcreteSyntax(concreteSyntax: JSON): LanguageBuilder {
    this.concreteSyntax = concreteSyntax;
    return this;
  }

  public getConcreteSyntax(): JSON | undefined {
    return this.concreteSyntax;
  }

  public setType(type: string): LanguageBuilder {
    this.type = type;
    return this;
  }

  public getType(): string | undefined {
    return this.type;
  }

  public setStateAccept(stateAccept: string): LanguageBuilder {
    this.stateAccept = stateAccept;
    return this;
  }

  public getStateAccept(): string | undefined {
    return this.stateAccept;
  }

  public setSemantics(semantics: JSON): LanguageBuilder {
    this.semantics = semantics;
    return this;
  }

  public getSemantics(): JSON | undefined {
    return this.semantics;
  }

  public setUserId(userId: string): LanguageBuilder {
    this.userId = userId;
    return this;
  }

  public getUserId(): string | undefined {
    return this.userId;
  }

  public setOwnerName(ownerName: string): LanguageBuilder {
    this.ownerName = ownerName;
    return this;
  }

  public getOwnerName(): string | undefined {
    return this.ownerName;
  }

  public setCreatedAt(createdAt: Date): LanguageBuilder {
    this.createdAt = createdAt;
    return this;
  }

  public getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  public setUpdatedAt(updatedAt: Date): LanguageBuilder {
    this.updatedAt = updatedAt;
    return this;
  }

  public getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  public setOwners(owners: LanguageOwner[]): LanguageBuilder {
    this.owners = owners;
    return this;
  }

  public getOwners(): LanguageOwner[] | undefined {
    return this.owners;
  }

  public build(): Language {
    return Language.build(this);
  }
}
