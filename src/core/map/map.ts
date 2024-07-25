import { isAsyncIterable, isIterable } from './../../utils';

import { IterableInfer, ReturnIterableIteratorType } from './../../types';

function* syncMap<A, B>(fn: (args: A) => B, iter: Iterable<A>): IterableIterator<B> {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { done, value } = iterator.next();

    if (done) break;

    yield fn(value);
  }
}

function asyncMap<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): AsyncIterableIterator<B> {
  const iterator = iter[Symbol.asyncIterator]();

  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    async next() {
      const { done, value } = await iterator.next();

      if (done) return { done: true, value: undefined };

      return { done: false, value: await fn(value) };
    },
  };
}

function map<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter: A,
): ReturnIterableIteratorType<A, B>;

function map<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
): (iter: A) => ReturnIterableIteratorType<A, B>;

function map<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
):
  | IterableIterator<B>
  | AsyncIterableIterator<B>
  | ((iter: A) => IterableIterator<B> | AsyncIterableIterator<B>) {
  if (!iter)
    return (iter: A): ReturnIterableIteratorType<A, B> =>
      map(fn, iter as any) as ReturnIterableIteratorType<A, B>;

  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncMap(fn, iter);

  if (isIterable<IterableInfer<A>>(iter)) return syncMap(fn, iter);

  throw new Error('iterable or asyncIterable is required as second argument');
}

export default map;
