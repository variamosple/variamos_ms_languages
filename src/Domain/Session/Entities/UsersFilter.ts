import { PagedModel } from "../../Core/Entities/PagedModel";

export class UsersFilter extends PagedModel {
  constructor(
    public languageId?: number,
    public name?: string,
    public email?: string,
    pageNumber?: number,
    pageSize?: number
  ) {
    super(pageNumber, pageSize);
  }

  public static builder(): UsersFilterBuilder {
    return new UsersFilterBuilder();
  }

  public static build(builder: UsersFilterBuilder): UsersFilter {
    return new UsersFilter(
      builder.languageId,
      builder.name,
      builder.email,
      builder.pageNumber,
      builder.pageSize
    );
  }
}

class UsersFilterBuilder {
  public languageId?: number;
  public name?: string;
  public email?: string;
  public pageNumber?: number;
  public pageSize?: number;

  public setLanguageId(languageId: number): UsersFilterBuilder {
    this.languageId = languageId;
    return this;
  }

  public setName(name: string): UsersFilterBuilder {
    this.name = name;
    return this;
  }

  public setEmail(email: string): UsersFilterBuilder {
    this.email = email;
    return this;
  }

  public setPageNumber(pageNumber: number): UsersFilterBuilder {
    this.pageNumber = pageNumber;
    return this;
  }

  public setPageSize(pageSize: number): UsersFilterBuilder {
    this.pageSize = pageSize;
    return this;
  }

  public build(): UsersFilter {
    return UsersFilter.build(this);
  }
}
