import { isIterable, isPromise } from './../../utils';

function reduce<T, Acc, R extends Acc>(
  fn: (acc: R, value: Promise<any> extends T ? Awaited<T> : T) => R,
  acc: Acc,
  iter: Iterable<T>,
): Promise<any> extends T ? Promise<R> : R;

function reduce<T, Acc, R>(
  fn: (acc: R, value: Promise<any> extends T ? Awaited<T> : T) => R,
  acc: Acc,
  iter: Iterable<T>,
): Promise<any> extends T ? Promise<R> : R;

function reduce<T, R extends Promise<any> extends T ? Awaited<T> : T>(
  fn: (acc: R, value: Promise<any> extends T ? Awaited<T> : T) => R,
  acc: Iterable<T>,
): Promise<any> extends T ? Promise<R> : R;

function reduce<T, R>(
  fn: (acc: R, value: Promise<any> extends T ? Awaited<T> : T) => R,
  acc: Iterable<T>,
): Promise<any> extends T ? Promise<R> : R;

function reduce<T, Acc, R>(
  fn: (acc: Acc, value: T) => R,
  acc: Acc | Iterable<T | Promise<T>>,
  iter?: Iterable<T | Promise<T>>,
): R | Promise<R> | Promise<R | Promise<R>> {
  let iterator: Iterator<T | Promise<T>>;
  let result;

  if (!iter) {
    iterator = (acc as Iterable<T | Promise<T>>)[Symbol.iterator]();
    result = iterator.next().value;
  } else {
    result = acc;
    iterator = iter[Symbol.iterator]();
  }

  return isPromise(result, function recur(acc): R | Promise<R> {
    let { done, value } = iterator.next();
    if (done) return acc;

    if (value instanceof Promise) return value.then(value => recur(fn(acc, value)));

    acc = fn(acc, value);

    if (acc instanceof Promise) return acc.then(recur);

    return recur(acc);
  });
}

export default reduce;
