import { isIterable, isPromise } from './../../utils';

function syncReduce<T, Acc, R extends Acc>(
  fn: (acc: R, value: Promise<any> extends T ? Awaited<T> : T) => R,
  acc: Acc,
  iter: Iterable<T>,
): Promise<any> extends T ? Promise<R> : R;

function syncReduce<T, Acc, R>(
  fn: (acc: R, value: Promise<any> extends T ? Awaited<T> : T) => R,
  acc: Acc,
  iter: Iterable<T>,
): Promise<any> extends T ? Promise<R> : R;

function syncReduce<T, R extends Promise<any> extends T ? Awaited<T> : T>(
  fn: (acc: R, value: Promise<any> extends T ? Awaited<T> : T) => R,
  acc: Iterable<T>,
): Promise<any> extends T ? Promise<R> : R;

function syncReduce<T, R>(
  fn: (acc: R, value: Promise<any> extends T ? Awaited<T> : T) => R,
  acc: Iterable<T>,
): Promise<any> extends T ? Promise<R> : R;

function syncReduce<T, Acc, R>(
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

function reduce<R, Acc = any, V = any, T = any, Fn = any>(
  fn: (acc: Acc, value: V) => Fn,
): (iter: Iterable<T>) => R;

function reduce<T, R>(fn: (acc: R, value: Awaited<T>) => R): (iter: Iterable<Promise<T>>) => Promise<R>;

function reduce<T, Acc, R>(fn: (acc: R, value: T) => R, acc: Acc): (iter: Iterable<T>) => R;

function reduce<T, Acc, R extends Acc>(
  fn: (acc: R, value: Promise<any> extends T ? Awaited<T> : T) => R,
  acc?: Acc | Iterable<T>,
  iter?: Iterable<T>,
): R | Promise<R> | ((iter: Iterable<T>) => R | Promise<R>) {
  if (!acc && !iter) return (iter: Iterable<T>) => reduce(fn, iter);

  if (isIterable(acc) || isIterable(iter)) return syncReduce(fn, acc, iter as any);

  throw new Error('Not implemented');
}

export default reduce;
