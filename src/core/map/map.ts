import { isAsyncIterable, isIterable } from './../../utils';

function* syncMap<A, B>(
  fn: (args: A) => B,
  iter: Iterable<A | Promise<A>>,
): IterableIterator<B | Promise<B>> {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { done, value } = iterator.next();

    if (done) break;

    yield value instanceof Promise ? value.then(fn) : fn(value);
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

function map<A, B>(fn: (args: A) => B, iter: Iterable<Promise<A>>): IterableIterator<Promise<B>>;

function map<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): AsyncIterableIterator<B>;

function map<A, B>(
  fn: (args: A) => B,
): (
  iter: Iterable<A | Promise<A>> | AsyncIterable<A>,
) => IterableIterator<B | Promise<B>> | AsyncIterableIterator<B>;

function map<A, B>(
  fn: (args: A) => B,
  iter?: Iterable<A | Promise<A>> | AsyncIterable<A>,
):
  | IterableIterator<B | Promise<B>>
  | AsyncIterableIterator<B>
  | ((
      iter: Iterable<A | Promise<A>> | AsyncIterable<A>,
    ) => IterableIterator<B | Promise<B>> | AsyncIterableIterator<B>) {
  if (!iter) return iter => (isAsyncIterable(iter) ? asyncMap(fn, iter) : syncMap(fn, iter));

  if (isAsyncIterable(iter)) return asyncMap(fn, iter as AsyncIterable<A>);

  if (isIterable(iter)) return syncMap(fn, iter as Iterable<A | Promise<A>>);

  throw new Error('iterable or asyncIterable is required as second argument');
}

export default map;
