import { PagedModel } from '../../Core/Entities/PagedModel';

export class SemanticsFilter extends PagedModel {
  constructor(
    public searchValue?: string,
    pageNumber?: number,
    pageSize?: number
  ) {
    super(pageNumber, pageSize);
  }

  public static builder(): SemanticsFilterBuilder {
    return new SemanticsFilterBuilder();
  }

  public static build(builder: SemanticsFilterBuilder): SemanticsFilter {
    return new SemanticsFilter(
      builder.searchValue,
      builder.pageNumber,
      builder.pageSize
    );
  }
}

class SemanticsFilterBuilder {
  public searchValue?: string;
  public pageNumber?: number;
  public pageSize?: number;

  public setSearchValue(searchValue: string): SemanticsFilterBuilder {
    this.searchValue = searchValue;
    return this;
  }

  public setPageNumber(pageNumber: number): SemanticsFilterBuilder {
    this.pageNumber = pageNumber;
    return this;
  }

  public setPageSize(pageSize: number): SemanticsFilterBuilder {
    this.pageSize = pageSize;
    return this;
  }

  public build(): SemanticsFilter {
    return SemanticsFilter.build(this);
  }
}
