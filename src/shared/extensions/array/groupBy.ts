export type GroupResult<T, TKey> = {
  key: TKey;
  items: T[];
}[];

/**
 *
 * Группировка
 * @param keyExpression - функция генератор ключа группировки
 * @param compare - функция проверки ключей. Нужна для непримитивных типов (объектов, массивов, функций)
 * т.к. JS не умеет корректно сравнивать непримитивы это нужно делать руками
 *
 */

export function groupBy<T, TKey>(
  keyExpression: (item: T) => TKey,
  compare?: (a: TKey, b: TKey) => boolean,
): GroupResult<T, TKey> {
  // @ts-ignore
  const array: Array<T> = this;

  const comparator = compare || ((a: TKey, b: TKey) => a === b);

  const groupResult = array.reduce<GroupResult<T, TKey>>((old, curr) => {
    const key = keyExpression(curr);

    const found = old.find((x) => comparator(x.key, key));

    if (found !== undefined) {
      found.items.push(curr);
      return old;
    }

    return [...old, { key, items: [curr] }];
  }, []);

  return groupResult;
}
