import { isPromise } from './../../utils';

function reduce<T, Acc>(
  fn: (acc: Acc, value: Awaited<T>) => Acc,
  acc: Acc,
  iter: Iterable<T>,
): IterableIterator<Acc>;
function reduce<T extends Promise<any>, Acc>(
  fn: (acc: Acc, value: Awaited<T>) => Acc,
  acc: Acc,
  iter: Iterable<T>,
): IterableIterator<Promise<Acc>>;
function reduce<T, Acc extends Awaited<T>>(
  fn: (acc: Acc, value: Awaited<T>) => Acc,
  acc: Iterable<T>,
): IterableIterator<Acc>;
function reduce<T extends Promise<any>, Acc>(
  fn: (acc: Acc, value: Awaited<T>) => Acc,
  acc: Iterable<T>,
): IterableIterator<Promise<Acc>>;
function reduce<T, Acc>(
  fn: (acc: Acc, value: T) => Acc,
  acc: Acc | Iterable<T | Promise<T>>,
  iter?: Iterable<T | Promise<T>>,
): Acc | Promise<Acc> | Promise<Acc | Promise<Acc>> {
  let iterator: Iterator<T | Promise<T>>;
  let result;

  if (!iter) {
    iterator = (acc as Iterable<T | Promise<T>>)[Symbol.iterator]();
    result = iterator.next().value;
  } else {
    result = acc as Acc;
    iterator = iter[Symbol.iterator]();
  }

  return isPromise(result, function recur(acc): Acc | Promise<Acc> {
    let { done, value } = iterator.next();
    if (done) return acc;

    if (value instanceof Promise) return value.then(value => recur(fn(acc, value)));

    acc = fn(acc, value);

    if (acc instanceof Promise) return acc.then(recur);

    return recur(acc);
  });
}

export default reduce;
