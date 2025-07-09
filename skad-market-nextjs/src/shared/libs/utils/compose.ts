/**
 * Создаёт композицию неограниченного количества функций.
 *
 * @param funcs Перечисление функций, которые будут скомпонованы. Каждая функция
 * должна принимать один аргумент и возвращать значение, которое может служить входом
 * для следующей функции в цепочке. Первая функция в списке является последней, которая выполняется,
 * принимая исходный аргумент.
 * @returns Возвращает функцию, которая принимает один аргумент и последовательно
 * применяет к нему все функции из `funcs`, начиная с последней. Результатом является
 * результат последовательного применения всех функций.
 *
 * @example
 * const increment = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const square = (x: number) => x * x;
 * const composed = compose(square, double, increment);
 * console.log(composed(2)); // Выведет 36, т.к. (2 -> 3 -> 6 -> 36)
 */
export function compose(...funcs: Function[]) {
  return (arg: any) => funcs.reduceRight((acc, func) => func(acc), arg)
}

export function composeActions(...funcs: (() => void)[]) {
  return () => funcs.forEach((func) => func())
}
