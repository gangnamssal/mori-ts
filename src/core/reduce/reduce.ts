import { isAsyncIterable, isIterable, isPromise, IterableInfer } from './../../utils';

function syncReduce<T extends Iterable<any>, Acc, R extends Acc>(
  fn: (acc: R, value: Awaited<IterableInfer<T>>) => R,
  acc: Acc,
  iter: T,
): Promise<any> extends IterableInfer<T> ? Promise<R> : R;

function syncReduce<T extends Iterable<any>, Acc extends Awaited<IterableInfer<T>>, R>(
  fn: (acc: Acc, value: Awaited<IterableInfer<T>>) => R,
  acc: T,
): Promise<any> extends T ? Promise<R> : R;

function syncReduce<T extends Iterable<any>, Acc extends Awaited<IterableInfer<T>>, R extends Acc>(
  fn: (acc: Acc | R, value: Awaited<IterableInfer<T>>) => R,
  acc: Acc | T,
  iter?: T,
): R | Promise<R> | Promise<Promise<R>> {
  let iterator;
  let result;

  if (!iter) {
    iterator = (acc as T)[Symbol.iterator]();
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

function asyncReduce<T extends AsyncIterable<any>, Acc, R extends Acc>(
  fn: (acc: R, value: Awaited<IterableInfer<T>>) => R,
  acc: Acc,
  iter: T,
): Promise<R>;

function asyncReduce<T extends AsyncIterable<any>, Acc extends Awaited<IterableInfer<T>>, R>(
  fn: (acc: Acc, value: Awaited<IterableInfer<T>>) => R,
  acc: T,
): Promise<R>;

function asyncReduce<T extends AsyncIterable<any>, Acc extends Awaited<IterableInfer<T>>, R extends Acc>(
  fn: (acc: Acc | R, value: Awaited<IterableInfer<T>>) => R,
  acc: Acc | T,
  iter?: T,
): Promise<R> | Promise<Promise<R>> {
  let iterator;
  let result;

  if (!iter) {
    iterator = (acc as T)[Symbol.asyncIterator]();
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

function reduce<T extends Iterable<any>, Acc, R extends Acc>(
  fn: (acc: R, value: Awaited<IterableInfer<T>>) => R,
  acc: Acc,
  iter: T,
): Promise<any> extends IterableInfer<T> ? Promise<R> : R;

function reduce<T extends Iterable<any>, Acc extends Awaited<IterableInfer<T>>, R>(
  fn: (acc: Acc, value: Awaited<IterableInfer<T>>) => R,
  acc: T,
): Promise<any> extends IterableInfer<T> ? Promise<R> : R;

function reduce<T extends AsyncIterable<any>, Acc, R extends Acc>(
  fn: (acc: R, value: Awaited<IterableInfer<T>>) => R,
  acc: Acc,
  iter: T,
): Promise<R>;

function reduce<T extends AsyncIterable<any>, Acc extends Awaited<IterableInfer<T>>, R>(
  fn: (acc: Acc, value: Awaited<IterableInfer<T>>) => R,
  acc: T,
): Promise<R>;

function reduce<
  T extends Iterable<any> | AsyncIterable<any>,
  Acc extends Awaited<IterableInfer<T>>,
  R extends Acc,
>(fn: (acc: Acc | R, value: IterableInfer<T>) => R): (iter: T) => Promise<any> extends T ? Promise<R> : R;

function reduce<T extends Iterable<any> | AsyncIterable<any>, Acc, R extends Acc | Awaited<IterableInfer<T>>>(
  fn: (acc: R, value: Awaited<IterableInfer<T>>) => R,
  acc?: Acc | T,
  iter?: T,
): R | Promise<R> | ((iter: T) => R | Promise<R>) {
  if (!acc && !iter) return (iter: T): R | Promise<R> => reduce(fn, iter as Iterable<any>) as R | Promise<R>;

  if (isIterable(acc) || isIterable(iter)) return syncReduce(fn, acc, iter as Iterable<any>);

  if (isAsyncIterable(acc) || isAsyncIterable(iter)) return asyncReduce(fn, acc, iter as AsyncIterable<any>);

  throw new Error('Invalid arguments');
}

export default reduce;
