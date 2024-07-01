import { isAsyncIterable, isIterable, isPromise } from './../../utils';

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

function asyncReduce<T, Acc, R>(fn: (acc: Acc, value: T) => R, acc: Acc, iter: AsyncIterable<T>): Promise<R>;

function asyncReduce<T, Acc extends T, R>(fn: (acc: Acc, value: T) => R, acc: AsyncIterable<T>): Promise<R>;

function asyncReduce<T, Acc, R>(
  fn: (acc: Acc, value: T) => R,
  acc: Acc | AsyncIterable<T>,
  iter?: AsyncIterable<T>,
): Promise<R> | Promise<Promise<R>> {
  let iterator: AsyncIterator<T>;
  let result;

  if (!iter) {
    iterator = (acc as AsyncIterable<T>)[Symbol.asyncIterator]();
    result = iterator.next().then(({ value }) => value);
  } else {
    result = acc;
    iterator = iter[Symbol.asyncIterator]();
  }

  return isPromise(result, function recur(acc): Promise<R> {
    return iterator.next().then(({ done, value }) => {
      if (done) return acc;

      return isPromise(value, value => recur(fn(acc, value)));
    });
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

function reduce<T, Acc, R>(fn: (acc: Acc, value: T) => R, acc: Acc, iter: AsyncIterable<T>): Promise<R>;

function reduce<T, Acc extends T, R>(fn: (acc: Acc, value: T) => R, acc: AsyncIterable<T>): Promise<R>;

function reduce<R, Acc = any, V = any, T = any, Fn = any>(
  fn: (acc: Acc, value: V) => Fn,
): (iter: Iterable<T> | AsyncIterable<T>) => R;

function reduce<T, Acc, R extends Acc>(
  fn: (
    acc: Acc | Iterable<T> | AsyncIterable<T> | undefined,
    value: Promise<any> extends T ? Awaited<T> : T,
  ) => R,
  acc?: Acc | Iterable<T> | AsyncIterable<T>,
  iter?: Iterable<T> | AsyncIterable<T>,
): R | Promise<R> | ((iter: Iterable<T>) => R | Promise<R>) {
  if (!acc && !iter) return (iter: Iterable<T>) => reduce(fn, iter);

  if (isIterable(acc) || isIterable(iter)) return syncReduce(fn, acc, iter as any);

  if (isAsyncIterable(acc) || isAsyncIterable(iter)) return asyncReduce(fn, acc, iter as any);

  throw new Error('Not implemented');
}

export default reduce;
