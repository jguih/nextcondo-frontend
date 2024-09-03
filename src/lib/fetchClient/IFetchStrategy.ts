export interface IFetchStrategy<Output> {
  handleAsync: (response: Response) => Promise<Output>;
}
