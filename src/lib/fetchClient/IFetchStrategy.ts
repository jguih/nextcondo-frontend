export interface IFetchStrategy<Output = undefined> {
  handleAsync: (response: Response) => Promise<Output | undefined>;
}
