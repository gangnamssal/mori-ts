import { isAsyncIterable, isIterable } from '../../utils';

function* syncFilter<A, B>(
  fn: (args: A | Promise<A>) => B,
  iter: Iterable<A | Promise<A>>,
): IterableIterator<A | Promise<A>> {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { done, value } = iterator.next();

    if (done) break;

    if (fn(value)) yield value;
  }
}

async function* asyncFilter<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): AsyncIterableIterator<A> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { done, value } = await iterator.next();
    if (done) return;

    const result = await fn(value);

    if (result) yield value;
  }
}

function filter<A, B>(fn: (args: A) => B, iter: Iterable<A>): IterableIterator<A>;

function filter<A, B>(fn: (args: Promise<A>) => B, iter: Iterable<Promise<A>>): IterableIterator<Promise<A>>;

function filter<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): AsyncIterableIterator<A>;

function filter<A, B>(
  fn: (args: A) => B,
): (
  iter: Iterable<A | Promise<A>> | AsyncIterable<A>,
) => IterableIterator<A | Promise<A>> | AsyncIterableIterator<A>;

function filter<A, B>(
  fn: (args: A | Promise<A>) => B,
  iter?: Iterable<A | Promise<A>> | AsyncIterable<A>,
):
  | IterableIterator<A | Promise<A>>
  | AsyncIterableIterator<A>
  | ((
      iter: Iterable<A | Promise<A>> | AsyncIterable<A>,
    ) => IterableIterator<A | Promise<A>> | AsyncIterableIterator<A>) {
  if (!iter) return (iter: Iterable<A | Promise<A>> | AsyncIterable<A>) => filter(fn, iter as any);

  if (isAsyncIterable(iter)) return asyncFilter(fn, iter);

  if (isIterable(iter)) return syncFilter(fn, iter);

  throw new Error('Must be an iterable or async iterable');
}

export default filter;
