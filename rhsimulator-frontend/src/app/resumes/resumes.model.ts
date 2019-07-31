export class Resume {
  constructor(
    public name: string,
    public content: string,
    public curriculum: string,
    // tslint:disable-next-line:variable-name
    public _id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,
  ) {}
}
