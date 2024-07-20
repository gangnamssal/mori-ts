import { isAsyncIterable, isIterable, isPromise } from './../../utils';
import { IterableInfer, ReturnIterableType } from '../../types';

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

function reduce<A extends Iterable<unknown> | AsyncIterable<unknown>, Acc, R extends Acc>(
  fn: (acc: R, value: IterableInfer<A>) => R,
  acc: Acc,
  iter: A,
): ReturnIterableType<A, R>;

function reduce<A extends Iterable<unknown> | AsyncIterable<unknown>, Acc extends IterableInfer<A>, R>(
  fn: (acc: Acc, value: IterableInfer<A>) => R,
  acc: A,
): ReturnIterableType<A, R>;

function reduce<
  A extends Iterable<unknown> | AsyncIterable<unknown>,
  Acc extends IterableInfer<A>,
  R extends Acc,
>(fn: (acc: Acc | R, value: IterableInfer<A>) => R): (iter: A) => ReturnIterableType<A, R>;

function reduce<A extends Iterable<unknown> | AsyncIterable<unknown>, Acc, R extends Acc | IterableInfer<A>>(
  fn: (acc: Acc | R, value: IterableInfer<A>) => R,
  acc?: Acc | A,
  iter?: A,
): ReturnIterableType<A, R> | ((iter: A) => ReturnIterableType<A, R>) {
  if (!acc && !iter)
    return (iter: A): ReturnIterableType<A, R> =>
      reduce(fn as any, iter as Iterable<any>) as ReturnIterableType<A, R>;

  if (isIterable(acc) || isIterable(iter))
    return syncReduce(fn as any, acc, iter as Iterable<unknown>) as ReturnIterableType<A, R>;

  if (isAsyncIterable(acc) || isAsyncIterable(iter))
    return asyncReduce(fn as any, acc, iter as AsyncIterable<unknown>) as ReturnIterableType<A, R>;

  throw new Error('Invalid arguments');
}

export default reduce;
