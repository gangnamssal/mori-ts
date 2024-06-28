import { isAsyncIterable, isIterable } from './../../utils';

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

      return { done: false, value: fn(value) };
    },
  };
}

function map<A, B>(fn: (args: A) => B, iter: Iterable<A>): IterableIterator<B>;

function map<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): AsyncIterableIterator<B>;

function map<A, B>(
  fn: (args: A) => B,
): (iter: Iterable<A> | AsyncIterable<A>) => IterableIterator<B> | AsyncIterableIterator<B>;

function map<A, B>(
  fn: (args: A) => B,
  iter?: Iterable<A> | AsyncIterable<A>,
):
  | IterableIterator<B>
  | AsyncIterableIterator<B>
  | ((iter: Iterable<A> | AsyncIterable<A>) => IterableIterator<B> | AsyncIterableIterator<B>) {
  if (!iter)
    return (iter: Iterable<A> | AsyncIterable<A>) => (isAsyncIterable(iter) ? map(fn, iter) : map(fn, iter));

  if (isAsyncIterable(iter)) return asyncMap(fn, iter as AsyncIterable<A>);

  if (isIterable(iter)) return syncMap(fn, iter as Iterable<A>);

  throw new Error('iterable or asyncIterable is required as second argument');
}

export default map;
