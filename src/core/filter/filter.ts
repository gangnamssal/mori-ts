import { isAsyncIterable, isIterable } from '../../utils';
import { IterableInfer, ReturnIterableIteratorType } from '../../types';

function* syncFilter<A, B>(fn: (args: A) => B, iter: Iterable<A>): IterableIterator<A> {
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

function filter<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter: A,
): ReturnIterableIteratorType<A>;

function filter<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
): (iter: A) => ReturnIterableIteratorType<A>;

function filter<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
): ReturnIterableIteratorType<A> | ((iter: A) => ReturnIterableIteratorType<A>) {
  if (!iter)
    return (iter: A): ReturnIterableIteratorType<A> =>
      filter(fn, iter as any) as ReturnIterableIteratorType<A>;

  if (isIterable<IterableInfer<A>>(iter)) return syncFilter(fn, iter) as ReturnIterableIteratorType<A>;

  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncFilter(fn, iter) as ReturnIterableIteratorType<A>;

  throw new Error('Must be an iterable or async iterable');
}

export default filter;
