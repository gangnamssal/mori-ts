import { isAsyncIterable, isIterable } from './../../utils';
import { IterableInfer, ReturnIterableType } from './../../types';

function syncSome<A, B>(fn: (args: A) => B, iter: Iterable<A>): boolean {
  const iterator = iter[Symbol.iterator]();

  while (true) {
    const { value, done } = iterator.next();

    if (done) return false;

    if (fn(value)) return true;
  }
}

async function asyncSome<A, B>(fn: (args: A) => B, iter: AsyncIterable<A>): Promise<boolean> {
  const iterator = iter[Symbol.asyncIterator]();

  while (true) {
    const { value, done } = await iterator.next();

    if (done) return false;

    if (fn(value)) return true;
  }
}

function some<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter: A,
): ReturnIterableType<A, boolean>;

function some<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
): (iter: A) => ReturnIterableType<A, boolean>;

function some<A extends Iterable<unknown> | AsyncIterable<unknown>, B>(
  fn: (args: IterableInfer<A>) => B,
  iter?: A,
): boolean | Promise<boolean> | ((iter: A) => boolean | Promise<boolean>) {
  if (!iter) return (iter: A): boolean | Promise<boolean> => some(fn, iter) as boolean | Promise<boolean>;

  if (isIterable<IterableInfer<A>>(iter)) return syncSome(fn, iter);

  if (isAsyncIterable<IterableInfer<A>>(iter)) return asyncSome(fn, iter);

  throw new Error('argument is not iterable');
}

export default some;
