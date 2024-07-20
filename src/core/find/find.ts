import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterableType } from '../../types';

function syncFind<A, R>(fn: (args: A) => R, iter: Iterable<A>): A | undefined {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { value, done } = iterator.next();

    if (done) return;

    if (fn(value)) return value;
  }
}

async function asyncFind<A, R>(fn: (args: A) => R, iter: AsyncIterable<A>): Promise<A | undefined> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { value, done } = await iterator.next();

    if (done) return;

    if (fn(value)) return value;
  }
}

function find<A extends Iterable<unknown> | AsyncIterable<unknown>, R>(
  fn: (args: IterableInfer<A>) => R,
  iter: A,
): ReturnIterableType<A, IterableInfer<A> | undefined>;

function find<A extends Iterable<unknown> | AsyncIterable<unknown>, R>(
  fn: (args: IterableInfer<A>) => R,
): (iter: A) => ReturnIterableType<A, IterableInfer<A> | undefined>;

function find<A extends Iterable<unknown> | AsyncIterable<unknown>, R>(
  fn: (args: IterableInfer<A>) => R,
  iter?: A,
):
  | ReturnIterableType<A, IterableInfer<A> | undefined>
  | ((iter: A) => ReturnIterableType<A, IterableInfer<A> | undefined>) {
  if (!iter)
    return (iter: A): ReturnIterableType<A, IterableInfer<A> | undefined> =>
      find(fn, iter) as ReturnIterableType<A, IterableInfer<A> | undefined>;

  if (isIterable<IterableInfer<A>>(iter))
    return syncFind(fn, iter) as ReturnIterableType<A, IterableInfer<A> | undefined>;

  if (isAsyncIterable<IterableInfer<A>>(iter))
    return asyncFind(fn, iter) as ReturnIterableType<A, IterableInfer<A> | undefined>;

  throw new Error('argument is not iterable');
}

export default find;
