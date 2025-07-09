import { GroupResult, groupBy } from './groupBy';

declare global {
  interface Array<T> {
    groupBy<TKey>(
      keyExpression: (item: T) => TKey,
      compare?: (a: TKey, b: TKey) => boolean,
    ): GroupResult<T, TKey>;
  }
}

export const installArrayExtensions = () => {
  Array.prototype.groupBy = groupBy;
};
