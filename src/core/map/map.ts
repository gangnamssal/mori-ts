import {
  IsPromise,
  IterableInfer,
  ReturnIterableIteratorType,
  isAsyncIterable,
  isIterable,
} from './../../utils';

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

function map<A, B>(
  fn: (args: A extends Promise<any> ? Awaited<A> : A) => IsPromise<A, B>,
  iter: Iterable<A>,
): IterableIterator<IsPromise<A, B>>;

function map<A, B>(fn: (args: Awaited<A>) => B, iter: Iterable<Promise<A>>): IterableIterator<Promise<B>>;

function map<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): AsyncIterableIterator<B>;

function map<A extends Iterable<any> | AsyncIterable<any>, B>(
  fn: (args: Awaited<IterableInfer<A>>) => B,
): (iter: A) => ReturnIterableIteratorType<A, IsPromise<IterableInfer<A>, B>>;

function map<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
):
  | IterableIterator<B | Promise<B>>
  | AsyncIterableIterator<B>
  | ((iter: A) => IterableIterator<B | Promise<B>> | AsyncIterableIterator<B>) {
  if (!iter)
    return (iter: A): ReturnIterableIteratorType<A, B> =>
      map(fn, iter as any) as ReturnIterableIteratorType<A, B>;

  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncMap(fn, iter);

  if (isIterable<IterableInfer<A>>(iter)) return syncMap(fn, iter);

  throw new Error('iterable or asyncIterable is required as second argument');
}

export default map;
