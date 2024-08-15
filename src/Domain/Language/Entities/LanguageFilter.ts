import { PagedModel } from '../../Core/Entities/PagedModel';

export class LanguageFilter extends PagedModel {
  constructor(
    public userId?: string,
    public name?: string,
    pageNumber?: number,
    pageSize?: number
  ) {
    super(pageNumber, pageSize);
  }

  public static builder(): LanguageFilterBuilder {
    return new LanguageFilterBuilder();
  }

  public static build(builder: LanguageFilterBuilder): LanguageFilter {
    return new LanguageFilter(
      builder.userId,
      builder.name,
      builder.pageNumber,
      builder.pageSize
    );
  }
}

class LanguageFilterBuilder {
  public userId?: string;
  public name?: string;
  public pageNumber?: number;
  public pageSize?: number;

  public setUserId(userId: string): LanguageFilterBuilder {
    this.userId = userId;
    return this;
  }

  public setName(name: string): LanguageFilterBuilder {
    this.name = name;
    return this;
  }

  public setPageNumber(pageNumber: number): LanguageFilterBuilder {
    this.pageNumber = pageNumber;
    return this;
  }

  public setPageSize(pageSize: number): LanguageFilterBuilder {
    this.pageSize = pageSize;
    return this;
  }

  public build(): LanguageFilter {
    return LanguageFilter.build(this);
  }
}
